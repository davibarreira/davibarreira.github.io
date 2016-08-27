#!/bin/sh

SRC="$1"
convert $SRC -resize 1200 res-$SRC
# To use this script,
# run the following from a terminal
# in a folder containing an image named foo.png (or whatever):
#   chmod u+x convert.sh
#   ./convert.sh foo
