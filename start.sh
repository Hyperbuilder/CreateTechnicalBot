# /bin/sh
while true
do
echo Starting Bot
node main.js 2>&1 | tee -a log.txt
echo Restarting Bot in 5 seconds...
sleep 5
done
