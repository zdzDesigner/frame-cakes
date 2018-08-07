#!/bin/bash

# 查看参数
echo $@

name=item
tag=0.0.1
NODE_ENV=pro

# parse args
optspec=":tag:name-:"

while getopts "$optspec" optchar; do
  case "${optchar}" in
  -)
      case "${OPTARG}" in
        name=*) name=${OPTARG#*=} ;;
        tag=*) tag=${OPTARG#*=} ;;
    esac;;
  esac
done

# 获取当前地址
basedir=$(cd `dirname $0`; pwd)

# if [ "$(uname -s)" = 'Linux' ]; then
# basedir=$(dirname "$(readlink -f "$0" || echo "$(echo "$0" | sed -e 's,\\,/,g')")")
# else
# basedir=$(dirname "$(readlink "$0" || echo "$(echo "$0" | sed -e 's,\\,/,g')")")
# fi
# echo $basedir

# inject env
export PRODUCT_TAG=$tag
export PRODUCT_NAME=$name
export NODE_ENV=$NODE_ENV

source $basedir/config.sh &&
source $basedir/ready.sh &&
source $basedir/cdn.sh
