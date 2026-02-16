def simple_pascal(n):
    triangle = [[1]]  # Start with the first row

    for i in range(1, n):
        prev_row = triangle[-1]
        # New row starts with 1
        new_row = [1]
        
        # Add the sums of neighbors from the previous row
        for j in range(len(prev_row) - 1):
            new_row.append(prev_row[j] + prev_row[j+1])
        
        # New row ends with 1
        new_row.append(1)
        triangle.append(new_row)
        
    return triangle

# Test it
for row in simple_pascal(8):
    print(row)