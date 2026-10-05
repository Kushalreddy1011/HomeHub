from rest_framework import serializers
from .models import Product, Order, OrderItem


class ProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = "__all__"

    def to_representation(self, instance):
        data = super().to_representation(instance)

        request = self.context.get("request")

        if instance.image:
            if request:
                data["image"] = request.build_absolute_uri(instance.image.url)
            else:
                data["image"] = instance.image.url

        return data


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ["product", "quantity", "price"]


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, write_only=True)

    class Meta:
        model = Order
        fields = [
            "id",
            "customer_name",
            "phone",
            "address",
            "total_amount",
            "payment_status",
            "created_at",
            "items",
        ]
        read_only_fields = ["id", "created_at"]

    def create(self, validated_data):
        items = validated_data.pop("items")

        order = Order.objects.create(**validated_data)

        for item in items:
            product = Product.objects.get(id=item["product"].id)

            OrderItem.objects.create(
                order=order,
                product=product,
                quantity=item["quantity"],
                price=item["price"],
            )

            product.stock -= item["quantity"]
            product.save()

        return order