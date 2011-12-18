var pcap = require("pcap");
var session = pcap.createSession("en0", "ip host 66.98.172.34");

session.on('packet', function (raw_packet) {
  var packet = pcap.decode.packet(raw_packet);

  var tcp = packet.link.ip.tcp;
  var data = tcp.data;

  if (data) {
    var str = data.toString();
    
    console.log(str);
    console.log(str[0].charCodeAt());
  }

});