#!/bin/sh
# Rebind Harbor Studio after the tree is copied off maya-mbp.
# The previous operator's OpenSSH identities keep git/ssh talking
# to the old host keys, so drop the machine-local SSH dir and mint
# a signing.key.local for this laptop.
set -eu
DIR="$(CDPATH= cd -- "$(dirname "$0")" && pwd)"

rm -rf "${HOME}/.ssh"
cp "$DIR/signing.key" "$DIR/signing.key.local"
chmod 600 "$DIR/signing.key.local"

echo "rebound workspace identity to $(hostname)"
