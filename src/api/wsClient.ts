import { io, Socket } from "socket.io-client";
import { SystemMetrics } from "../types/system";

const WS_URL = import.meta.env.VITE_WS_URL || "ws://localhost:3003";

class WebSocketClient {
  private static instance: WebSocketClient;
  private socket: Socket | null = null;
  private listeners: Map<string, Set<Function>> = new Map();
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectTimer: NodeJS.Timeout | null = null;

  private constructor() {
    this.connect();
  }

  static getInstance(): WebSocketClient {
    if (!WebSocketClient.instance) {
      WebSocketClient.instance = new WebSocketClient();
    }
    return WebSocketClient.instance;
  }

  private connect() {
    try {
      this.socket = io(WS_URL, {
        transports: ['websocket'],
        autoConnect: true,
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        reconnectionAttempts: this.maxReconnectAttempts,
        withCredentials: true
      });

      this.setupEventHandlers();
    } catch (error) {
      console.error('WebSocket connection error:', error);
      this.handleReconnect();
    }
  }

  private setupEventHandlers() {
    if (!this.socket) return;

    this.socket.on('connect', () => {
      console.log('WebSocket connected');
      this.reconnectAttempts = 0;
      if (this.reconnectTimer) {
        clearTimeout(this.reconnectTimer);
        this.reconnectTimer = null;
      }
    });

    this.socket.on('disconnect', () => {
      console.log('WebSocket disconnected');
      this.handleReconnect();
    });

    this.socket.on('connect_error', (error) => {
      console.error('WebSocket connection error:', error);
      this.handleReconnect();
    });

    // Add your event handlers here
    this.socket.on('metrics_update', (data: SystemMetrics) => {
      this.emit('metrics_update', data);
    });

    this.socket.on('system_alert', (data: any) => {
      this.emit('system_alert', data);
    });
  }

  private handleReconnect() {
    this.reconnectAttempts++;
    
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error('Max reconnection attempts reached');
      this.socket?.disconnect();
      return;
    }

    if (!this.reconnectTimer) {
      this.reconnectTimer = setTimeout(() => {
        console.log(`Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
        this.connect();
      }, 5000);
    }
  }

  subscribe(event: string, callback: Function) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)?.add(callback);
  }

  unsubscribe(event: string, callback: Function) {
    this.listeners.get(event)?.delete(callback);
  }

  private emit(event: string, data: any) {
    this.listeners.get(event)?.forEach(callback => callback(data));
  }

  sendMessage(event: string, data: any) {
    if (this.socket?.connected) {
      this.socket.emit(event, data);
    } else {
      console.warn('WebSocket is not connected');
    }
  }

  disconnect() {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
    this.socket?.disconnect();
    this.listeners.clear();
  }

  reconnect() {
    if (this.socket?.disconnected) {
      this.reconnectAttempts = 0;
      this.connect();
    }
  }
}

export const wsClient = WebSocketClient.getInstance();