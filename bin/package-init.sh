#!/usr/bin/env bash

NAME=${NAME:-$1}
if [ -z $NAME ]; then
  echo "$0 <name> is required"
  exit 1
fi
VERSION=${2:-"4.0.0-b-1"}

pkg(){
if [ -f package.json ]; then
  echo "package.json exists $NAME";
  return 1
fi

cat <<EOF> package.json
{
  "name":"$NAME",
  "version":"$VERSION",
  "scripts":{
     "test":"subschema-karma",
     "karma":"subschema-karma",
     "build":"subschema-webpack"
  },
  "dependencies":{
    "subschema-util":"^$VERSION"
  },
  "devDependencies":{
    "subschema-dev-support":"^$VERSION"
  }
}


EOF
}

readme(){
  if [ -f README.md ]; then
    echo "README.md exists in $NAME"
  fi

cat << EOF > README.md
${NAME}
===

## Installation
\`\`\`sh
 $ yarn install $NAME
\`\`\`
EOF
}

pkg
readme
