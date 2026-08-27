#!/bin/bash
# Lance `next dev`, attend que le serveur réponde, puis ouvre Safari.
# On attend le serveur (poll) plutôt qu'un `sleep` fixe, et on tue le
# process next dev à la sortie (trap) pour éviter de le laisser tourner
# en arrière-plan quand on quitte avec Ctrl+C.

PORT="${PORT:-3000}"
URL="http://localhost:${PORT}"

next dev "$@" &
DEV_PID=$!

cleanup() {
  kill "$DEV_PID" 2>/dev/null
}
trap cleanup EXIT INT TERM

(
  until curl -sf "$URL" >/dev/null 2>&1; do
    sleep 0.3
  done
  open -a Safari "$URL"
) &

wait "$DEV_PID"
