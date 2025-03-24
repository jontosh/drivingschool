import { useState } from "react";
import { Modal, Form, Input, Button, Select, Space } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";

const CreateTestModal = ({ isOpen, onClose, onSubmit }) => {
  const [form] = Form.useForm();
  const [questions, setQuestions] = useState([{ question: "", answers: ["", "", "", ""], correctAnswer: null }]);

  const handleAddQuestion = () => {
    setQuestions([...questions, { question: "", answers: ["", "", "", ""], correctAnswer: null }]);
  };

  const handleRemoveQuestion = (index) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
  };

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      const testData = {
        title: values.title,
        description: values.description,
        courseId: values.courseId,
        questions: questions.map((q, index) => ({
          question: values[`question${index}`],
          answers: q.answers.map((_, i) => values[`question${index}answer${i}`]),
          correctAnswer: values[`correctAnswer${index}`]
        }))
      };
      onSubmit(testData);
      form.resetFields();
      setQuestions([{ question: "", answers: ["", "", "", ""], correctAnswer: null }]);
      onClose();
    });
  };

  return (
    <Modal
      title="Create New Test"
      open={isOpen}
      onCancel={onClose}
      width={800}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className="space-y-4"
      >
        <Form.Item
          label="Test Title"
          name="title"
          rules={[{ required: true, message: "Please enter test title" }]}
        >
          <Input placeholder="Enter test title" />
        </Form.Item>

        <Form.Item
          label="Test Description"
          name="description"
          rules={[{ required: true, message: "Please enter test description" }]}
        >
          <Input.TextArea placeholder="Enter test description" rows={4} />
        </Form.Item>

        <div className="space-y-6">
          {questions.map((question, questionIndex) => (
            <div 
              key={questionIndex}
              className="border border-gray-200 rounded-lg p-4 relative"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Question {questionIndex + 1}</h3>
                {questions.length > 1 && (
                  <Button
                    type="text"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => handleRemoveQuestion(questionIndex)}
                  />
                )}
              </div>

              <Form.Item
                label="Question Text"
                name={`question${questionIndex}`}
                rules={[{ required: true, message: "Please enter question text" }]}
              >
                <Input.TextArea placeholder="Enter question text" rows={2} />
              </Form.Item>

              <div className="space-y-3">
                {question.answers.map((_, answerIndex) => (
                  <Form.Item
                    key={answerIndex}
                    label={`Answer ${answerIndex + 1}`}
                    name={`question${questionIndex}answer${answerIndex}`}
                    rules={[{ required: true, message: "Please enter answer" }]}
                  >
                    <Input placeholder={`Enter answer ${answerIndex + 1}`} />
                  </Form.Item>
                ))}
              </div>

              <Form.Item
                label="Correct Answer"
                name={`correctAnswer${questionIndex}`}
                rules={[{ required: true, message: "Please select correct answer" }]}
              >
                <Select placeholder="Select correct answer">
                  {question.answers.map((_, index) => (
                    <Select.Option key={index} value={index}>
                      Answer {index + 1}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
          ))}
        </div>

        <div className="flex justify-between pt-4">
          <Button
            type="dashed"
            onClick={handleAddQuestion}
            icon={<PlusOutlined />}
          >
            Add Question
          </Button>

          <Space>
            <Button onClick={onClose}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" className="bg-indigo-600">
              Save Test
            </Button>
          </Space>
        </div>
      </Form>
    </Modal>
  );
};

export default CreateTestModal;
