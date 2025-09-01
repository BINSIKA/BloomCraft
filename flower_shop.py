# flower_shop.py

class Product:
    def __init__(self, pid, name, price, description=""):
        self.id = pid
        self.name = name
        self.price = price
        self.description = description

    def __repr__(self):
        return f"{self.id}. {self.name} - ₹{self.price}"


class Cart:
    def __init__(self):
        self.items = {}  # {product_id: quantity}

    def add(self, product, qty=1):
        if product.id in self.items:
            self.items[product.id]["quantity"] += qty
        else:
            self.items[product.id] = {
                "product": product,
                "quantity": qty
            }
        print(f"✅ Added {qty} x {product.name} to cart")

    def remove(self, product_id):
        if product_id in self.items:
            removed = self.items.pop(product_id)
            print(f"❌ Removed {removed['product'].name} from cart")
        else:
            print("⚠️ Product not in cart")

    def view(self):
        if not self.items:
            print("🛒 Cart is empty")
            return
        print("\n--- Your Cart ---")
        total = 0
        for item in self.items.values():
            product = item["product"]
            qty = item["quantity"]
            cost = product.price * qty
            total += cost
            print(f"{product.name} ({qty} x ₹{product.price}) = ₹{cost}")
        print(f"Total: ₹{total}\n")

    def checkout(self):
        if not self.items:
            print("⚠️ Cart is empty. Cannot checkout.")
            return
        print("\n💐 Checkout Successful! Your Order Summary:")
        self.view()
        self.items.clear()


# ---------------------------
# Sample Data
# ---------------------------
products = [
    Product(1, "Red Roses Bouquet", 1200, "Fresh red roses."),
    Product(2, "Tulip Sunshine", 950, "Yellow tulips."),
    Product(3, "Orchid Delight", 1500, "Elegant orchids."),
    Product(4, "Lily Charm", 800, "White lilies.")
]

# ---------------------------
# Simulation
# ---------------------------
if __name__ == "__main__":
    cart = Cart()

    # Show product list
    print("🌸 Welcome to Flower Shop 🌸\nAvailable Products:")
    for p in products:
        print(p)

    # Add products
    cart.add(products[0], 2)  # 2 roses
    cart.add(products[2], 1)  # 1 orchid

    # View cart
    cart.view()

    # Remove one product
    cart.remove(1)

    # View again
    cart.view()

    # Checkout
    cart.checkout()
