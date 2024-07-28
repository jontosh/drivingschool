import ButtonComponent from "@/components/button/index.jsx";
import IconComponent from "@/components/icons/index.jsx";
import Title, { Paragraph } from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { TestForm } from "@/modules/management.jsx";
import { useRequestIdQuery } from "@/redux/query/index.jsx";
import {
  Collapse,
  ConfigProvider,
  Form,
  message,
  Modal,
  Statistic,
} from "antd";
import classNames from "classnames";
import { Fragment, useContext, useEffect, useState } from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import { BiTime } from "react-icons/bi";
import { IoMdCheckmarkCircle, IoMdCloseCircle } from "react-icons/io";
import { IoCheckmarkCircle } from "react-icons/io5";
import { LuRefreshCw } from "react-icons/lu";
import useLocalStorage from "use-local-storage";
import moment from "moment";

const StudentTestView = ({ timer }) => {
  const { colorsObject } = useContext(ColorsContext);
  const [TestId] = useLocalStorage("test-id", "0");
  const [TestResults, setTestResults] = useLocalStorage("test-results", "[]");
  const [QuestionId, setQuestionId] = useState(0);
  const [QuestionIndex, setQuestionIndex] = useState(0);
  const [form] = Form.useForm();
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [isFormDisabled, setIsFormDisabled] = useState(false);
  const [ModalResult, setModalResult] = useState(false);
  const [Percentage, setPercentage] = useState(0);
  const [CorrectAnswers, setCorrectAnswers] = useState(0);

  const { data: TestData, isLoading: TestLoading } = useRequestIdQuery({
    path: "/account_management/services/test",
    id: TestId,
  });

  const { data: QuestionItem, isLoading: QuestionLoading } = useRequestIdQuery({
    path: "/account_management/services/question",
    id: QuestionId,
  });

  useEffect(() => {
    const results = JSON.parse(TestResults);
    if (TestData && TestResults && results) {
      const currentQuestionResult = results.find(
        (result) => Object.keys(result)[0] === QuestionId.toString(),
      );

      if (currentQuestionResult) {
        form.setFieldsValue({
          answers: currentQuestionResult?.values?.answers?.map((answer) => ({
            is_correct: answer.is_correct,
          })),
        });
        setIsAnswerSubmitted(true);
        setIsFormDisabled(true);
      } else {
        setIsAnswerSubmitted(false);
        setIsFormDisabled(false);
      }
    }
  }, [TestData, QuestionItem, QuestionId, TestResults, form]);

  const handleModalState = () => setModalResult((prev) => !prev);

  const handleQuestionItem = (value, index) => {
    setQuestionId(value);
    setQuestionIndex(index - 1);
    setIsAnswerSubmitted(false);
    setIsFormDisabled(false);
  };

  const handlePrevQuestion = () => {
    if (QuestionIndex > 0) {
      setQuestionIndex((prev) => prev - 1);
      setQuestionId(TestData.questions[QuestionIndex - 1]);
      setIsFormDisabled(false);
    }
  };

  const handleNextQuestion = () => {
    if (QuestionIndex < TestData.questions.length - 1) {
      setQuestionIndex(QuestionIndex + 1);
      setQuestionId(TestData.questions[QuestionIndex + 1]);
      setIsFormDisabled(false);
    }
  };

  const onFinish = () => {
    message.info("Time is finished!");
  };

  const checkCorrectness = (arr1, arr2) => {
    const map1 = arr1?.reduce((acc, obj, index) => {
      acc[index] = obj.is_correct;
      return acc;
    }, {});

    const map2 = arr2?.reduce((acc, obj, index) => {
      acc[index] = obj.is_correct;
      return acc;
    }, {});

    return Object.keys(map1).some((key) => {
      return map1[key] === true && map2[key] === true;
    });
  };

  const onFormFinish = async (values) => {
    const questions = JSON.parse(TestResults);
    const result = checkCorrectness(QuestionItem?.answers, values?.answers);

    const existingQuestionIndex = questions.findIndex(
      (q) => Object.keys(q)[0] === QuestionId.toString(),
    );

    if (existingQuestionIndex !== -1) {
      questions[existingQuestionIndex] = { [QuestionId]: result, values };
    } else {
      questions.push({ [QuestionId]: result, values });
    }

    setTestResults(JSON.stringify(questions));
    setIsAnswerSubmitted(true);
    setIsFormDisabled(true);
  };

  const handleConfirmAnswers = async () => {
    const results = JSON.parse(TestResults);

    const booleanResults = results.map((result) => Object.values(result)[0]);

    const correctAnswersCount = booleanResults.filter(
      (answer) => answer,
    ).length;

    setCorrectAnswers(correctAnswersCount);

    const correctAnswersPercentage =
      (correctAnswersCount / booleanResults.length) * 100;

    if (!TestLoading) {
      setPercentage(correctAnswersPercentage.toFixed(1));
      setModalResult(true);
    }
  };

  const deadline = moment(TestData?.timer ?? new Date()).add(2, "hour");

  const questionItem = TestData?.questions?.map((item, index) => {
    index += 1;

    return (
      <li key={index}>
        <ButtonComponent
          onClick={() => handleQuestionItem(item, index)}
          controlHeight={42}
          paddingInline={16}
          className={"w-full"}
          defaultBorderColor={colorsObject.main}
          borderRadius={5}
          defaultBg={"#5459EA1A"}
          defaultHoverBg={"#5459EA1A"}
        >
          <div className={"flex items-center justify-between"}>
            <Paragraph fontSize={"text-[#9195FF]"}>
              Quiz question {index}
            </Paragraph>

            <IconComponent
              className={"text-[#878CEE]"}
              icon={<IoCheckmarkCircle />}
            />
          </div>
        </ButtonComponent>
      </li>
    );
  });

  const items = [
    {
      key: "1",
      label: "Quiz Questions List",
      children: (
        <ul
          className={classNames(
            "space-y-5 border-t p-4 -m-4",
            TestData?.questions?.length * 42 > 42 * 9
              ? "h-[487px] overflow-y-scroll"
              : null,
          )}
        >
          {TestLoading ? "Loading..." : questionItem}
        </ul>
      ),
    },
  ];

  return (
    <div className={"px-3 sm:px-11 flex gap-5"}>
      <article className="flex-grow space-y-8">
        <div className="space-y-3.5">
          <Title level={1} fontSize={"text-[42px] font-medium"}>
            {TestData?.name}
          </Title>

          <Paragraph fontSize={"text-2xl font-medium"}>
            Question {QuestionIndex + 1} of {TestData?.questions?.length}:
          </Paragraph>

          <Paragraph fontSize={"text-base"}>
            {QuestionLoading ? "Loading..." : QuestionItem?.question}
          </Paragraph>
        </div>

        {QuestionLoading ? (
          "Loading..."
        ) : QuestionIndex >= 0 ? (
          <Fragment>
            <Form form={form} onFinish={onFormFinish}>
              <TestForm data={QuestionItem} disabled={isFormDisabled} border={true} />

              <div className="space-x-5">
                <ButtonComponent
                  defaultBg={colorsObject.secondary}
                  defaultHoverBg={colorsObject.secondaryHover}
                  paddingInline={43}
                  borderRadius={5}
                  type={"button"}
                  onClick={handlePrevQuestion}
                  disabled={QuestionIndex === 0}
                >
                  Prev
                </ButtonComponent>

                {JSON.parse(TestResults)?.length ===
                  TestData?.questions?.length ? (
                  <ButtonComponent
                    defaultBg={"#878CEE"}
                    defaultHoverBg={"#878CEE"}
                    paddingInline={43}
                    borderRadius={5}
                    type={"button"}
                    onClick={handleConfirmAnswers}
                  >
                    COMPLETE TEST
                  </ButtonComponent>
                ) : (
                  <ButtonComponent
                    defaultBg={colorsObject.info}
                    defaultHoverBg={colorsObject.infoHover}
                    paddingInline={43}
                    borderRadius={5}
                    type={"submit"}
                    disabled={isAnswerSubmitted}
                  >
                    Submit Answer
                  </ButtonComponent>
                )}

                <ButtonComponent
                  defaultBg={colorsObject.secondary}
                  defaultHoverBg={colorsObject.secondaryHover}
                  paddingInline={43}
                  borderRadius={5}
                  type={"button"}
                  onClick={handleNextQuestion}
                  disabled={QuestionIndex === TestData?.questions?.length - 1}
                >
                  Next
                </ButtonComponent>
              </div>
            </Form>

            <Modal
              title="Result"
              centered
              open={ModalResult}
              onOk={handleModalState}
              onCancel={handleModalState}
              footer={null}
            >
              <div className="space-y-5 text-center">
                <div className="max-w-52 w-full mx-auto">
                  <CircularProgressbar
                    value={Percentage}
                    text={`${Percentage}%`}
                    styles={buildStyles({
                      textColor: "#383D54",
                      pathColor:
                        Percentage >= TestData?.passing_grade
                          ? "#878CEE"
                          : "#FF4D4D",
                    })}
                  />
                </div>

                <Title level={2} fontSize={"text-[50px] font-bold"}>
                  {Percentage >= TestData?.passing_grade ? "Amazing!" : "Fail!"}
                </Title>

                <Paragraph fontSize={"text-xl"} fontWeightStrong={400}>
                  {Percentage >= TestData?.passing_grade
                    ? "Congratulations, you’ve successfully passed the test."
                    : "You need 70% or above to pass Make time go over the lessons and try again!"}
                </Paragraph>

                {timer && (
                  <time className="text-[#BEAB46] text-2xl font-normal">
                    <BiTime /> {timer}
                  </time>
                )}

                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-red-50 p-5 rounded-lg space-y-3">
                    <Title level={3} fontSize={"text-[50px] text-red-500"}>
                      {JSON.parse(TestResults)?.length - CorrectAnswers}
                    </Title>

                    <IconComponent
                      className={"cursor-text text-3xl"}
                      icon={<IoMdCloseCircle />}
                      classNames={"flex items-center gap-x-1 text-red-500"}
                    >
                      Mistakes
                    </IconComponent>
                  </div>

                  <div className="bg-green-50 p-5 rounded-lg space-y-3">
                    <Title level={3} fontSize={"text-[50px] text-green-500"}>
                      {CorrectAnswers}
                    </Title>

                    <IconComponent
                      className={"cursor-text text-3xl"}
                      icon={<IoMdCheckmarkCircle />}
                      classNames={"flex items-center gap-x-1 text-green-500"}
                    >
                      Correct
                    </IconComponent>
                  </div>
                </div>

                <div className="flex gap-6 items-center justify-center">
                  <ButtonComponent
                    defaultBg="#BEAB46"
                    defaultHoverBg="#BEAB46"
                    paddingInline={43}
                    borderRadius={10}
                    className={"flex items-center gap-x-2"}
                  >
                    <LuRefreshCw />
                    Retry
                  </ButtonComponent>

                  <ButtonComponent
                    defaultBg={colorsObject.info}
                    defaultHoverBg={colorsObject.infoHover}
                    paddingInline={43}
                    borderRadius={10}
                  >
                    Continue
                  </ButtonComponent>
                </div>
              </div>
            </Modal>
          </Fragment>
        ) : (
          "Choose one of Question"
        )}
      </article>

      <aside className={"max-w-96 w-full"}>
        {timer && (
          <Statistic.Countdown
            title="Timer Remaining :"
            value={deadline}
            onFinish={onFinish}
            className="w-full h-[175px] border rounded-xl shadow-xl text-center py-14"
          />
        )}

        <ConfigProvider
          theme={{
            token: {
              colorBorder: "#E1E1E1",
            },
          }}
        >
          <Collapse
            defaultActiveKey={["1"]}
            items={items}
            expandIconPosition="end"
            className="text-base font-semibold w-full shadow-xl mt-10"
          />
        </ConfigProvider>
      </aside>
    </div>
  );
};

export default StudentTestView;
