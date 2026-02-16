import random

# 1. Initialize Menu and Prices
ramen_menu = {1: "Shoyu Ramen", 2: "Miso Ramen", 3: "Tonkotsu Ramen", 4: "Spicy Veggie Ramen"}
ramen_prices = {1: 12.50, 2: 13.00, 3: 15.00, 4: 11.50}

# 2. Initialize Order List
customer_order = []

# 3. Lambda Function to Calculate Total Cost
# It sums the prices of items in the order list and adds the delivery charge
calculate_cost = lambda order, delivery: (sum(ramen_prices[i] for i in order) + delivery) if order else 0

# 4. Recursive Function for Arcade Game
def play_arcade(guesses=1):
    target = 7  # You can also use random.randint(1, 10)
    # target = random.randint(1, 10)
    print(f"--- Guess {guesses} ---")
    try:
        user_guess = int(input("Guess a number between 1 and 10: "))
        if user_guess == target:
            print(f"Winner! It took you {guesses} guesses.")
            return
        else:
            print("Incorrect!")
            print("Target was :::", target)
            return play_arcade(guesses + 1) # Recursive call
    except ValueError:
        print("Please enter a valid number.")
        return play_arcade(guesses)

# 5. Function to Start Program (Recursive)
def start_program(delivery_fee=0):
    print("\n--- Welcome to Ichiraku Ramen ---")
    print("1. Order Ramen")
    print("2. Online Delivery")
    print("3. Play Arcade Game")
    print("4. Exit")
    
    choice = input("Enter your choice (1-4): ")

    if choice == '1':
        print("\nMenu:")
        for id, name in ramen_menu.items():
            print(f"{id}: {name} (${ramen_prices[id]})")
        
        try:
            order_id = int(input("Select Ramen ID to add to order: "))
            if order_id in ramen_menu:
                customer_order.append(order_id)
                print(f"Added {ramen_menu[order_id]} to your bowl!")
            else:
                print("Invalid ID.")
        except ValueError:
            print("Invalid input.")

    elif choice == '2':
        address = input("Enter your delivery address: ")
        # Simulating distance-based charge
        distance = float(input("Enter distance from shop in miles: "))
        delivery_fee = distance * 1.50
        print(f"Delivery to {address} confirmed. Fee: ${delivery_fee:.2f}")

    elif choice == '3':
        play_arcade()

    elif choice == '4':
        print("Thank you for visiting! Goodbye.")
        return # Base case: ends the recursion

    else:
        print("Invalid choice. Please try again.")

    # Show Current Order and Total
    current_items = [ramen_menu[i] for i in customer_order]
    total = calculate_cost(customer_order, delivery_fee)
    
    print("-" * 30)
    print(f"Current Order: {', '.join(current_items) if current_items else 'Empty'}")
    print(f"Total Cost (including delivery): ${total:.2f}")
    print("-" * 30)

    # Recursive call to restart the menu
    start_program(delivery_fee)

# 6. Start the Program
if __name__ == "__main__":
    start_program()