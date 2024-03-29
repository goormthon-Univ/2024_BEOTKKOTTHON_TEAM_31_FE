import React, { useEffect, useState } from 'react';
import { CategoryType, QuizAnswerType, QuizType } from '../data/type';
import { categoryEngToKor } from '../data/variable';
import QuizBox from '../components/questionPage/QuizBox';
import ExplainBox from '../components/explainPage/ExplainBox';
import Footer from '../components/common/Footer';
import { useLocation, useNavigate } from 'react-router-dom';
import PrimaryButton from '../components/questionPage/PrimaryButton';
import TitleBar from '../components/common/TitleBar';
import { useMutation } from 'react-query';
import { postSimilarSingleGradeApi } from '../api/similarApi';
import { getMemberId } from '../api/localStorage';

const SimilarExplainPage = () => {
  const navigate = useNavigate();
  const memberId = getMemberId() || '';
  const { category, baseQuizId, quizAnswer } = useLocation().state as {
    category: string;
    baseQuizId: number;
    quizAnswer: QuizAnswerType;
  };
  const [realCategory, setRealCategory] = useState<CategoryType>('LANG');
  const [quiz, setQuiz] = useState<QuizType | null>(null);
  const [explain, setExplain] = useState({ selected: 0, answer: 0, isCorrect: false, solution: '' });
  const { mutate: postSimilarSingleGrade } = useMutation(
    'postSimilarSingleGrade',
    () => postSimilarSingleGradeApi(memberId, baseQuizId, quizAnswer),
    {
      onSuccess: (data) => {
        console.log(data);
        setQuiz({
          id: data.data.result.id,
          quizNum: data.data.result.quizNum,
          category: realCategory,
          choiceFirst: data.data.result.choiceFirst,
          choiceSecond: data.data.result.choiceSecond,
          choiceThird: data.data.result.choiceThird,
          choiceFourth: data.data.result.choiceFourth,
          choiceFifth: data.data.result.choiceFifth,
          example: data.data.result.example,
          title: data.data.result.title,
        });
        setExplain({
          selected: data.data.result.userChoice,
          answer: data.data.result.answer,
          isCorrect: data.data.result.isCorrect,
          solution: data.data.result.solution,
        });
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );

  useEffect(() => {
    setRealCategory(
      category === 'LANG' ? 'LANG' : category === 'MATH' ? 'MATH' : category === 'DEDUCE' ? 'DEDUCE' : 'SPATIAL',
    );
  }, [category]);

  useEffect(() => {
    if (!category && !baseQuizId && !quizAnswer) return;
    postSimilarSingleGrade();
  }, [category, baseQuizId, quizAnswer]);

  if (!quiz) return <div>로딩중...</div>;

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-start">
      <div className="w-full px-4 pt-6 pb-40 flex items-center justify-between bg-main rounded-xl">
        <TitleBar
          text={`${categoryEngToKor[realCategory]} ${quiz.quizNum}번 유사문제 해설`}
          isPrev={true}
          isHome={true}
        />
      </div>
      <div className="w-full px-4 py-6 flex flex-col items-center justify-start -translate-y-40">
        <div className="w-full flex flex-col items-center justify-start">
          <QuizBox
            quiz={quiz}
            setIsAbleToNext={() => {}}
            userAnswer={explain.selected}
            correctAnswer={explain.answer}
            type={explain.isCorrect ? 'true' : 'false'}
            selected={null}
            setSelected={() => {}}
          />
        </div>
        <div className="mt-6 w-full flex flex-col items-center justify-start gap-y-2">
          <ExplainBox text={explain.solution} />
        </div>
        <div className="w-full pt-6">
          <PrimaryButton
            text="다른 유사문제 생성하기"
            onClick={() => navigate('/similar', { state: { category: category, id: baseQuizId } })}
            isAble={true}
          />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default SimilarExplainPage;
