#!/bin/bash
if [[ ! -f ./server/.dev.vars ]]; then
  echo "No .dev.vars file found. Opening Google Cloud Console to get the secret."
  sleep 1
  open "https://console.cloud.google.com/apis/credentials/oauthclient/1060883813950-ku2t78clneeeqvhvv4d8lna6k28n3q23.apps.googleusercontent.com?project=sigma-myth-213911"
  
  # Ask for value
  echo "Enter the client secret:"
  read SECRET

  # Write value to file
  echo -n "GOOGLE_CLIENT_SECRET=$SECRET" > server/.dev.vars
  echo "Created .dev.vars file."

  # Print value
  echo "--- .dev.vars ---"
  cat server/.dev.vars
  echo "---"
fi

if ! bun &> /dev/null; then
  echo "No bun found. Installing..."
  curl -fsSL https://bun.sh/install | bash
fi

if [[ ! -d ./node_modules ]]; then
  echo "No node_modules found. Installing..."
  bun run fast-install && bun run dev
  exit 0
fi

# Clear typescript cache
rm tsconfig.tsbuildinfo &> /dev/null 2>&1

./scripts/typegen.sh &> /dev/null 2>&1

# Start dev server
install-changed --install-command 'npm run fast-install' && bun run dev

# Bun install
# bun install && bun run dev
