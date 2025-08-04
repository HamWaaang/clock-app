import { useState, useEffect } from 'react';
import { Card, Typography, Space, Button } from 'antd';
import { ClockCircleOutlined, ReloadOutlined } from '@ant-design/icons';
import './App.css';

const { Title, Text } = Typography;

function App() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    let interval: number;
    
    if (isRunning) {
      interval = setInterval(() => {
        setCurrentTime(new Date());
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('zh-CN', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    });
  };

  const toggleClock = () => {
    setIsRunning(!isRunning);
  };

  const refreshTime = () => {
    setCurrentTime(new Date());
  };

  return (
    <div className="app">
      <div className="clock-container">
        <Card className="clock-card">
          <Space direction="vertical" size="large" align="center" style={{ width: '100%' }}>
            <ClockCircleOutlined className="clock-icon" />
            
            <Title level={1} className="time-display">
              {formatTime(currentTime)}
            </Title>
            
            <Text type="secondary" className="date-display">
              {formatDate(currentTime)}
            </Text>
            
            <Space size="middle">
              <Button 
                type={isRunning ? "default" : "primary"}
                icon={<ClockCircleOutlined />}
                onClick={toggleClock}
              >
                {isRunning ? '暂停' : '开始'}
              </Button>
              
              <Button 
                icon={<ReloadOutlined />}
                onClick={refreshTime}
              >
                刷新
              </Button>
            </Space>
          </Space>
        </Card>
      </div>
    </div>
  );
}

export default App;
