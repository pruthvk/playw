def get_pascals_triangle(n_rows: int) -> list[list[int]]:
    """Generates Pascal's Triangle up to n_rows using iterative addition."""
    triangle = []

    for row_idx in range(n_rows):
        # Create a row of '1's as a baseline
        row = [1] * (row_idx + 1)
        
        # Update interior elements (skip first and last)
        for j in range(1, row_idx):
            row[j] = triangle[row_idx - 1][j - 1] + triangle[row_idx - 1][j]
            
        triangle.append(row)
    
    return triangle

def print_formatted_triangle(triangle: list[list[int]]):
    """Prints the triangle in a centered, readable pyramid format."""
    n_rows = len(triangle)
    
    # Calculate max width based on the last (widest) row
    max_width = len("  ".join(map(str, triangle[-1])))

    for row in triangle:
        row_str = "  ".join(map(str, row))
        print(row_str.center(max_width))

# --- Execution ---
num_rows = 5
triangle_data = get_pascals_triangle(num_rows)
print_formatted_triangle(triangle_data)