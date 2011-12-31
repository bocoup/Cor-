var pcap = require("pcap");
var session = pcap.createSession("en0", "ip host 66.98.172.34");

session.on('packet', function (raw_packet) {
  var packet = pcap.decode.packet(raw_packet);

  var tcp = packet.link.ip.tcp;
  var data = tcp.data;

  if (data) {
    var str = data.toString(),
    message = str + "\n From: "+packet.link.ip.saddr+" To: "+packet.link.ip.daddr
    
    console.log(message);

    //console.log(str[0].charCodeAt());
  }

});
