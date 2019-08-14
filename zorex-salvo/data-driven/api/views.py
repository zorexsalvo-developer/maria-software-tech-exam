from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from plan.models import Plan, Term
from cart.models import Cart, Item
from .serializers import ListPlanSerializer, CreateCartSerializer


class ListPlanAPIView(ListAPIView):
    queryset = Plan.objects.all()
    serializer_class = ListPlanSerializer


class CreateCartAPIView(CreateAPIView):
    queryset = Cart.objects.all()
    serializer_class = CreateCartSerializer


class RetrieveCartAPIView(RetrieveAPIView):
    queryset = Cart.objects.all()
    serializer_class = CreateCartSerializer
    lookup_field = 'identifier'


class AddToCartAPIView(APIView):
    def put(self, request, identifier):
        data = request.data
        cart = Cart.objects.filter(status=Cart.STATUS.pending,
                                   identifier=identifier)

        if (cart):
            cart = cart.first()
            for item in data:
                plan = Plan.objects.get(identifier=item['plan'])
                terms = Term.objects.filter(plan=plan,
                                            term=item['payment_term'])

                if not terms:
                    return Response(
                        {
                            'message':
                            f"Payment term '{item['payment_term']}' is not available for {plan.name}"
                        },
                        status=status.HTTP_400_BAD_REQUEST)

                item['cart_id'] = cart.id
                item['plan'] = plan
                Item.objects.create(**item)
                cart.total_amount = cart.total_amount + (terms.first().amount *
                                                         item['quantity'])
                cart.save()

            return Response(CreateCartSerializer(cart).data)
        else:
            return Response(
                {
                    'message':
                    'Cart not found. Invalid cart identifier or cart is already paid. '
                },
                status=status.HTTP_404_NOT_FOUND)


class RemoveItemFromCartAPIView(APIView):
    def delete(self, request, cart_identifier, item_identifier):
        try:
            cart = Cart.objects.get(identifier=cart_identifier,
                                    status=Cart.STATUS.pending)
        except Cart.DoesNotExist:
            return Response(
                {
                    'message':
                    'Cart not found. Invalid cart identifier or cart is already paid.'
                },
                status=status.HTTP_404_NOT_FOUND)

        try:
            item = Item.objects.get(cart=cart, identifier=item_identifier)
            terms = Term.objects.filter(plan=item.plan, term=item.payment_term)
            cart.total_amount = cart.total_amount - (terms.first().amount *
                                                     item.quantity)
            cart.save()
            item.delete()

            return Response(CreateCartSerializer(cart).data)
        except Item.DoesNotExist:
            return Response({'message': 'Item not found'},
                            status=status.HTTP_404_NOT_FOUND)
