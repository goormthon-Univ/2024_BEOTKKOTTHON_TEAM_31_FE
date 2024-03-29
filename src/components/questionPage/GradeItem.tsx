import React from 'react';
import { ReactComponent as Correct } from '../../assets/icon/icon_correct.svg';
import { ReactComponent as Incorrect } from '../../assets/icon/icon_incorrect.svg';
import { ReactComponent as Next } from '../../assets/icon/icon_next.svg';
import { CategoryType } from '../../data/type';
import { useNavigate } from 'react-router-dom';

const GradeItem = ({
  category,
  quizId,
  quizNum,
  isCorrect,
  isSimilar,
}: {
  category: CategoryType;
  quizId: number;
  quizNum: number;
  isCorrect: boolean;
  isSimilar: boolean;
}) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        isSimilar ? navigate(`/similar/explain/${category}/${quizId}`) : navigate(`/explain/${category}/${quizId}`);
      }}
      className={`w-full rounded-lgx flex items-center justify-center px-6 py-4 gap-x-10 text-black text-gray_600 font-semibold cursor-pointer border border-solid ${isCorrect ? 'bg-[#2AE45E]/50 border-[#80F756]' : 'bg-[#FF5151]/50 border-[#FF8484]'}`}
    >
      {isCorrect ? (
        <Correct className="sm:w-3 md:w-4 lg:w-6 h-auto" />
      ) : (
        <Incorrect className="sm:w-3 md:w-4 lg:w-6 h-auto" />
      )}
      <div className="grow flex items-center justify-start">{quizNum}번 문제</div>
      <div className="flex items-center justify-center gap-x-2 text-10 text-gray_600">
        <div>해설 바로가기</div>
        <Next />
      </div>
    </div>
  );
};

export default GradeItem;
