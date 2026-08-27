#!/bin/bash
URL="http://localhost:3000"
CHECK_INTERVAL=10  # vérifier toutes les 10 secondes
WAS_DOWN=true       # true au départ : ouvre Safari dès que le serveur répond la 1ère fois

echo "👀 Surveillance de $URL démarrée..."

while true; do
  STATUS=$(curl -s -o /dev/null -w "%{http_code}" \
    --connect-timeout 3 "$URL")

  if [ "$STATUS" = "200" ]; then
    if [ "$WAS_DOWN" = true ]; then
      echo "✅ Site de retour — réouverture de Safari..."
      open -a Safari "$URL"
      WAS_DOWN=false
    fi
  else
    echo "⚠️ Site down (status: $STATUS) — attente..."
    WAS_DOWN=true
  fi

  sleep $CHECK_INTERVAL
done
