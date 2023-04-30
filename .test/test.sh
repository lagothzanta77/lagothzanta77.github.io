#!/bin/bash

for filens in $(find ./ -name "*htm*");do
    if ! [ -f $filens ];then continue;fi
    count1=$(grep -o -E '<' $filens | wc -l);
    count2=$(grep -o -E '>' $filens | wc -l);
    if [ "$count1" != "$count2" ];then exit 1;fi
done
echo "OK";
exit 0
