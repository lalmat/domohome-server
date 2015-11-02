### DomoHome Server

This is a Raspberry PI DomoHome server API.

This API allow the DomoHome Client (https://github.com/lalmat/domohome-client) to read/write GPIO remotely.

Actually, you should connect a 5v LED on pin 7 of your Raspberry's GPIO and use the client to On/Off the LED.

You could connect anything instead of a led (like a 220v relay !) and command this over your network.

It miss a decent authentication method (I'm working on it)

## Installation
First of all, you need to install nodeJs on your rPI. To do it without tears you can use this method :  
<code>
wget http://node-arm.herokuapp.com/node_latest_armhf.deb   
sudo dpkg -i node_latest_armhf.deb
</code>  

Then, you must install "quick2wire-gpio-admin" (https://github.com/quick2wire/quick2wire-gpio-admin). Take care. It's a bit tricky because you may need to patch the file "src/gpio-admin.c".

Change line 30 to :
<code>  
int size = snprintf(path, PATH_MAX, "/sys/class/gpio/gpio%u/%s", pin, filenam$
</code>

then <code>make</code> and <code>make install</code>.

Once you've done this, you can git clone this repo and finally :
<code>  
npm install  
node index.js
</code>

Have a nice day !
