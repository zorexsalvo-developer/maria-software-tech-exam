from rest_framework import serializers
from organization.models import Organization
from plan.models import Plan, Term


class OrganizationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organization
        fields = ('name', )


class TermSerializer(serializers.ModelSerializer):
    class Meta:
        model = Term
        fields = (
            'term',
            'amount',
        )

    def to_representation(self, obj):
        data = super(TermSerializer, self).to_representation(obj)
        data.update({'amount': data['amount'] / 100})
        return data


class ListPlanSerializer(serializers.ModelSerializer):
    hmo = OrganizationSerializer()
    payment_terms = TermSerializer(many=True)

    class Meta:
        model = Plan
        fields = ('identifier', 'name', 'hmo', 'payment_terms', 'created',
                  'modified')
