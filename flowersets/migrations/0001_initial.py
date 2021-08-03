# Generated by Django 3.1.7 on 2021-03-05 11:27

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Bouquet',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, verbose_name='Название букета')),
                ('number', models.PositiveIntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='BouquetSet',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, verbose_name='Название набора')),
                ('description', models.TextField(verbose_name='Описание набора')),
            ],
        ),
        migrations.CreateModel(
            name='BouquetSetSize',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, verbose_name='Название')),
                ('description', models.TextField()),
                ('price', models.DecimalField(decimal_places=2, max_digits=7)),
            ],
        ),
        migrations.CreateModel(
            name='BouquetImage',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to='')),
                ('bouquet', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='flowersets.bouquet', verbose_name='Букет')),
            ],
        ),
        migrations.AddField(
            model_name='bouquet',
            name='bouquetset',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='flowersets.bouquetset', verbose_name='Набор'),
        ),
    ]
