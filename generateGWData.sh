#!/bin/bash
listOfNodeMAC="11-21-22-01-11-00 11-21-22-01-22-00 11-21-22-01-33-00 11-21-22-01-44-00"
phNode1='11-21-22-01-11-00'
phNode2='11-21-22-01-22-00'
ecNode1='11-21-22-01-33-00'
ecNode2='11-21-22-01-44-00'
gatewayMAC='00-14-22-01-23-45'
listofPHValidValues="5 5.5 6 6.2 7 8 4.5"
listOfECValidValues="500 700 1200 1500 1330"

timer=5 # No of times

function sendECData()
{

	mosquitto_pub -p 1883 -h ec2-34-212-20-3.us-west-2.compute.amazonaws.com -t "SensorInfo" -m '{"GatewayMAC" :"00-14-22-01-23-45","NodeMAC" :"11-21-22-01-33-00","EventType":"Info","Sensor": "EC","Value":"700","Battery":"72"}'
	mosquitto_pub -p 1883 -h ec2-34-212-20-3.us-west-2.compute.amazonaws.com -t "SensorInfo" -m '{"GatewayMAC" :"00-14-22-01-23-45","NodeMAC" :"11-21-22-01-33-00","EventType":"Info","Sensor": "EC","Value":"1200","Battery":"66"}'
	mosquitto_pub -p 1883 -h ec2-34-212-20-3.us-west-2.compute.amazonaws.com -t "SensorInfo" -m '{"GatewayMAC" :"00-14-22-01-23-45","NodeMAC" :"11-21-22-01-33-00","EventType":"Info","Sensor": "EC","Value":"1330","Battery":"44"}'
	mosquitto_pub -p 1883 -h ec2-34-212-20-3.us-west-2.compute.amazonaws.com -t "SensorInfo" -m '{"GatewayMAC" :"00-14-22-01-23-45","NodeMAC" :"11-21-22-01-33-00","EventType":"Info","Sensor": "EC","Value":"500","Battery":"42"}'

	mosquitto_pub -p 1883 -h ec2-34-212-20-3.us-west-2.compute.amazonaws.com -t "SensorInfo" -m '{"GatewayMAC" :"00-14-22-01-23-45","NodeMAC" :"11-21-22-01-44-00","EventType":"Info","Sensor": "EC","Value":"500","Battery":"33"}'
	mosquitto_pub -p 1883 -h ec2-34-212-20-3.us-west-2.compute.amazonaws.com -t "SensorInfo" -m '{"GatewayMAC" :"00-14-22-01-23-45","NodeMAC" :"11-21-22-01-44-00","EventType":"Info","Sensor": "EC","Value":"1330","Battery":"56"}'
	mosquitto_pub -p 1883 -h ec2-34-212-20-3.us-west-2.compute.amazonaws.com -t "SensorInfo" -m '{"GatewayMAC" :"00-14-22-01-23-45","NodeMAC" :"11-21-22-01-44-00","EventType":"Info","Sensor": "EC","Value":"600","Battery":"40"}'
	mosquitto_pub -p 1883 -h ec2-34-212-20-3.us-west-2.compute.amazonaws.com -t "SensorInfo" -m '{"GatewayMAC" :"00-14-22-01-23-45","NodeMAC" :"11-21-22-01-44-00","EventType":"Info","Sensor": "EC","Value":"500","Battery":"44"}'
}

function sendPHData()
{

	mosquitto_pub -p 1883 -h ec2-34-212-20-3.us-west-2.compute.amazonaws.com -t "SensorInfo" -m '{"GatewayMAC" :"00-14-22-01-23-45","NodeMAC" :"11-21-22-01-22-00","EventType":"Info","Sensor": "PH","Value":"6.2","Battery":"76"}'
	mosquitto_pub -p 1883 -h ec2-34-212-20-3.us-west-2.compute.amazonaws.com -t "SensorInfo" -m '{"GatewayMAC" :"00-14-22-01-23-45","NodeMAC" :"11-21-22-01-22-00","EventType":"Info","Sensor": "PH","Value":"7","Battery":"66"}'
	mosquitto_pub -p 1883 -h ec2-34-212-20-3.us-west-2.compute.amazonaws.com -t "SensorInfo" -m '{"GatewayMAC" :"00-14-22-01-23-45","NodeMAC" :"11-21-22-01-22-00","EventType":"Info","Sensor": "PH","Value":"8","Battery":"35"}'
	mosquitto_pub -p 1883 -h ec2-34-212-20-3.us-west-2.compute.amazonaws.com -t "SensorInfo" -m '{"GatewayMAC" :"00-14-22-01-23-45","NodeMAC" :"11-21-22-01-22-00","EventType":"Info","Sensor": "PH","Value":"6","Battery":"42"}'

	mosquitto_pub -p 1883 -h ec2-34-212-20-3.us-west-2.compute.amazonaws.com -t "SensorInfo" -m '{"GatewayMAC" :"00-14-22-01-23-45","NodeMAC" :"11-21-22-01-11-00","EventType":"Info","Sensor": "PH","Value":"5.5","Battery":"33"}'
	mosquitto_pub -p 1883 -h ec2-34-212-20-3.us-west-2.compute.amazonaws.com -t "SensorInfo" -m '{"GatewayMAC" :"00-14-22-01-23-45","NodeMAC" :"11-21-22-01-11-00","EventType":"Info","Sensor": "PH","Value":"8","Battery":"56"}'
	mosquitto_pub -p 1883 -h ec2-34-212-20-3.us-west-2.compute.amazonaws.com -t "SensorInfo" -m '{"GatewayMAC" :"00-14-22-01-23-45","NodeMAC" :"11-21-22-01-11-00","EventType":"Info","Sensor": "PH","Value":"4.5","Battery":"40"}'
	mosquitto_pub -p 1883 -h ec2-34-212-20-3.us-west-2.compute.amazonaws.com -t "SensorInfo" -m '{"GatewayMAC" :"00-14-22-01-23-45","NodeMAC" :"11-21-22-01-11-00","EventType":"Info","Sensor": "PH","Value":"6","Battery":"44"}'
}

function trap_ctrlc ()
{
    echo
    echo "You pressed Ctrl+C ; Good Bye ..."
    exit 2
}

echo "## Generating dummy data for below netwrok ##"
echo "Default frequency is set for 5.Please change if needed var name in timer"
echo "Gateway  : $gatewayMAC"
echo "PH Nodes : $phNode1 and $phNode2"
echo "EC Nodes : $ecNode1 and $ecNode2"

trap "trap_ctrlc" 2

temp_cnt=${timer} 
while [[ ${temp_cnt} -gt 0 ]];
do
    #printf "\rYou have %2d second(s) remaining to hit Ctrl+C to cancel that operation!" ${temp_cnt}
    printf "\rYou have %2d counts remaining to hit Ctrl+C to cancel that operation!" ${temp_cnt}
    sendPHData
    sendECData	
    sleep 1
    ((temp_cnt--))
done
    echo
    echo "Data generated ...shuting down"
    echo "##########################################################################"
