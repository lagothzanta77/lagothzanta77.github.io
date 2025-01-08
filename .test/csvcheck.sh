#!/bin/bash

# Iterating over each "wo*.txt" file in the current directory
for file in ./wo*.txt; do
  # Reading each line in the file
  while IFS= read -r line; do
    # Count the number of ":" characters in the line
    colon_count=$(echo "$line" | awk -F':' '{print NF-1}')
    # Check if the line contains exactly 2 ":" characters
    if [ "$colon_count" -ne 2 ]; then
      echo "Bad CSV format in: $file - line: $line"
      exit 1
    fi
    # Check if any ":" characters are next to each other
    if echo "$line" | grep -q "::"; then
      echo "Bad CSV format in: $file - line: $line"
      exit 1
    fi
  done < "$file"
done
