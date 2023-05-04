# Intelligent, non-destructive pre-commit
# Adds any files changed due to pre-commit script

# Get array of modified files
MODIFIED_FILES_ARR=($(git diff --name-only))

# Lint
bun run pre-commit-run

# Get array of modified files after script
NEW_MODIFIED_FILES_ARR=($(git diff --name-only))

# Get files changed
MATCHED_FILES=()
for i in "${NEW_MODIFIED_FILES_ARR[@]}"; do
  for j in "${MODIFIED_FILES_ARR[@]}"; do
    if [[ $i == $j ]]; then
      MATCHED_FILES+=($i)
    fi
  done
done

# Get files that should not be added
RESET_FILES=()
for i in "${NEW_MODIFIED_FILES_ARR[@]}"; do
  for j in "${MATCHED_FILES[@]}"; do
    if [[ $i == $j ]]; then
      RESET_FILES+=($i)
    fi
  done
done

# Get files that should be added
INDEX=0
ADD_FILES=("${NEW_MODIFIED_FILES_ARR[@]}")
for i in "${NEW_MODIFIED_FILES_ARR[@]}"; do
  for j in "${RESET_FILES[@]}"; do
    if [[ $i == $j ]]; then
      unset ADD_FILES[$INDEX]
    fi
  done
  INDEX=$(expr $INDEX + 1)
done

if (( ${#ADD_FILES[@]} )); then
  echo "-------"
  echo "Adding files changed by pre-commit:"
  for item in "${ADD_FILES[@]}"; do
    echo $item
  done
  git add "${ADD_FILES[@]}"
  echo "-------"
fi
