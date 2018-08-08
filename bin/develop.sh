#!/bin/bash

basedir=$(cd `dirname $0`; pwd)

source $basedir/config.sh
node build/develop.js
