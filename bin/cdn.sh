#!/bin/bash

echo "Source Sending"

# 获取当前地址
basedir=$(cd `dirname $0`; pwd)

cd $(pwd)/dist &&
$basedir/cdn-oss -d console

