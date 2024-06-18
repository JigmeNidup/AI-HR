"use client";
import { SendOutlined } from "@ant-design/icons";
import { Button, Card, Col, Form, Input, Row, message } from "antd";
import Image from "next/image";
import { useEffect, useState } from "react";
import hr_img from "@/public/aihr.png";
import user_img from "@/public/user.jpg";

export default function Home() {
  const [Data, setData] = useState([
    {
      message: String("hi how are you"),
      user: "ai",
    },
  ]);

  const [render, setRender] = useState(Math.random());
  useEffect(() => {}, [render]);

  const handleSubmit = async (val) => {
    let { message } = val;
    let temp = Data;
    temp.push({ user: "user", message });
    setData(temp);

    try {
      let res = await fetch("http://localhost:5000/process-text", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      res = await res.json();
      let temp2 = Data;
      let msg = "";
      for (let i = 0; i < res.data.length; i++) {
        if (res.data[i] == "") {
          msg += " ";
        } else {
          msg += res.data[i];
        }
      }

      temp2.push({ user: "ai", message: msg });
      setData(temp2);
    } catch (error) {
      console.log(error);
    } finally {
      setRender(Math.random());
    }
  };

  return (
    <main
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "aquamarine",
      }}
    >
      <Card bordered hoverable style={{ height: 600, width: 450, padding: 0 }}>
        <Row>
          <Col span={24}>
            <div style={{ textAlign: "center", fontSize: "22px" }}>
              <h1>Chat With HR AI</h1>
            </div>
          </Col>
          <Col span={24} style={{ marginTop: 10 }}>
            <div style={{ height: 460, overflow: "auto" }}>
              {Data.map((val, i) => {
                let w = val.message.length * 10;
                if (w > 300) {
                  w = 300;
                } else if (w < 30) {
                  w = 40;
                }

                if (val.user === "ai") {
                  return (
                    <Row key={i} style={{ marginTop: 10 }}>
                      <Col span={2}>
                        <Image
                          style={{ borderRadius: 20 }}
                          src={hr_img}
                          height={30}
                          width={30}
                          alt="ai img"
                        />
                      </Col>
                      <Col
                        span={20}
                        style={{
                          textAlign: "justify",
                        }}
                      >
                        <p
                          style={{
                            width: w,
                            padding: 10,
                            marginRight: "auto",
                            marginLeft: 10,
                            border: "1px solid black",
                            borderRadius: "0px 10px 10px 10px",
                          }}
                        >
                          {val.message}
                        </p>
                      </Col>
                    </Row>
                  );
                } else {
                  return (
                    <Row key={i} style={{ marginTop: 10 }}>
                      <Col span={2} />
                      <Col
                        span={20}
                        style={{
                          textAlign: "justify",
                        }}
                      >
                        <p
                          style={{
                            width: w,
                            padding: 10,
                            marginLeft: "auto",
                            marginRight: 10,

                            border: "1px solid black",
                            borderRadius: "10px 0px 10px 10px",
                          }}
                        >
                          {val.message}
                        </p>
                      </Col>
                      <Col span={2}>
                        <Image
                          style={{ borderRadius: 20 }}
                          src={user_img}
                          height={30}
                          width={30}
                          alt="ai img"
                        />
                      </Col>
                    </Row>
                  );
                }
              })}
            </div>
          </Col>
          <Col
            span={24}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Form layout="inline" onFinish={handleSubmit}>
              <Form.Item name="message">
                <Input style={{ width: 280 }} />
              </Form.Item>

              <Form.Item>
                <Button
                  htmlType="submit"
                  type="primary"
                  style={{ width: 80 }}
                  icon={<SendOutlined />}
                >
                  Send
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Card>
    </main>
  );
}
