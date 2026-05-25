import 'package:socket_io_client/socket_io_client.dart' as IO;

class SocketService {
  static final SocketService _instance = SocketService._internal();
  late IO.Socket _socket;

  factory SocketService() {
    return _instance;
  }

  SocketService._internal();

  void connect() {
    _socket = IO.io(
      'http://localhost:5000',
      IO.OptionBuilder()
          .setTransports(['websocket'])
          .disableAutoConnect()
          .build(),
    );

    _socket.connect();

    _socket.on('connect', (_) {
      print('Connected to server');
    });

    _socket.on('disconnect', (_) {
      print('Disconnected from server');
    });

    _socket.on('receive_message', (data) {
      print('Received message: $data');
      // Handle incoming message
    });

    _socket.on('user_online', (data) {
      print('User online: $data');
    });

    _socket.on('user_offline', (data) {
      print('User offline: $data');
    });
  }

  void sendMessage(Map<String, dynamic> messageData) {
    _socket.emit('send_message', messageData);
  }

  void emitTyping(Map<String, dynamic> typingData) {
    _socket.emit('typing', typingData);
  }

  void disconnect() {
    _socket.disconnect();
  }

  IO.Socket getSocket() => _socket;
}
