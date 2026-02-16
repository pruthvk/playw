# Initialize library: {book_id: {'title': str, 'author': str, 'quantity': int}}
library = {}

def add_book():
    book_id = input("Enter unique Book ID: ")
    if book_id in library:
        print("Error: This ID already exists. Use 'Update' to change details.")
        return
    
    title = input("Enter Title: ")
    author = input("Enter Author: ")
    try:
        quantity = int(input("Enter Quantity: "))
        library[book_id] = {'title': title, 'author': author, 'quantity': quantity}
        print(f"Book '{title}' added successfully!")
    except ValueError:
        print("Invalid quantity. Please enter a number.")

def update_book():
    book_id = input("Enter Book ID to update: ")
    if book_id in library:
        print(f"Current details: {library[book_id]}")
        title = input("Enter new Title (leave blank to keep current): ")
        author = input("Enter new Author (leave blank to keep current): ")
        qty_input = input("Enter new Quantity (leave blank to keep current): ")
        
        if title: library[book_id]['title'] = title
        if author: library[book_id]['author'] = author
        if qty_input: library[book_id]['quantity'] = int(qty_input)
        print("Book updated successfully!")
    else:
        print("Book ID not found.")

def display_library():
    if not library:
        print("\nThe library is currently empty.")
        return
    
    print("\n" + "="*50)
    print(f"{'ID':<10} {'Title':<20} {'Author':<15} {'Qty':<5}")
    print("-" * 50)
    for bid, info in library.items():
        print(f"{bid:<10} {info['title']:<20} {info['author']:<15} {info['quantity']:<5}")
    print("="*50)

def loan_book():
    book_id = input("Enter Book ID to loan: ")
    if book_id in library:
        try:
            amount = int(input(f"How many copies? (Available: {library[book_id]['quantity']}): "))
            if amount <= library[book_id]['quantity']:
                library[book_id]['quantity'] -= amount
                print(f"Loan successful! Remaining: {library[book_id]['quantity']}")
            else:
                print("Error: Not enough copies available.")
        except ValueError:
            print("Invalid input. Please enter a number.")
    else:
        print("Book ID not found.")

def main():
    while True:
        print("\n--- Library Management System ---")
        print("1. Add Book")
        print("2. Update Book")
        print("3. Display Library")
        print("4. Loan Book")
        print("5. Exit")
        
        choice = input("Select an option (1-5): ")
        
        if choice == '1': add_book()
        elif choice == '2': update_book()
        elif choice == '3': display_library()
        elif choice == '4': loan_book()
        elif choice == '5': 
            print("Exiting system. Goodbye!")
            break
        else:
            print("Invalid choice. Please try again.")

if __name__ == "__main__":
    main()