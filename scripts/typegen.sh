#!/bin/bash
FILES=$(git diff --name-only | grep 'src/app/machines' | tr '\n' '|')
UNTRACKED_FILES=$(git ls-files --others --exclude-standard | grep 'src/app/machines' | tr '\n' '|')
FILES_FORMATTED=${UNTRACKED_FILES}${FILES%?}

if [[ -n $FILES_FORMATTED ]]; then
  echo "Running typegen"
  echo "---"
  echo $FILES_FORMATTED
  echo "---"
  xstate typegen "*$FILES_FORMATTED"
fi
