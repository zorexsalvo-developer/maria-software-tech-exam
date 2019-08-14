# Generated by Django 2.2.4 on 2019-08-14 02:52

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone
import model_utils.fields
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('plan', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Term',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', model_utils.fields.AutoCreatedField(default=django.utils.timezone.now, editable=False, verbose_name='created')),
                ('modified', model_utils.fields.AutoLastModifiedField(default=django.utils.timezone.now, editable=False, verbose_name='modified')),
                ('identifier', models.UUIDField(default=uuid.uuid4, editable=False)),
                ('term', models.CharField(choices=[('monthly', 'Monthly'), ('quarterly', 'Quarterly'), ('annually', 'Annually')], max_length=255)),
                ('amount', models.IntegerField()),
                ('plan', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='payment_terms', to='plan.Plan')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
