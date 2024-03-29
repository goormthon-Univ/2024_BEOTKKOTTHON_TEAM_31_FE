import React from 'react';
import { ReactComponent as Language } from '../../assets/illust/illust_language.svg';
import { ReactComponent as Math } from '../../assets/illust/illust_math.svg';
import { ReactComponent as Reasoning } from '../../assets/illust/illust_reasoning.svg';
import { ReactComponent as Space } from '../../assets/illust/illust_space.svg';
import { ReactComponent as StartBtn } from '../../assets/illust/illust_start_btn.svg';
import { ReactComponent as UnableStartBtn } from '../../assets/illust/illust_unable_start_btn.svg';
import { useNavigate } from 'react-router-dom';
import { CategoryListType, CategoryType } from '../../data/type';

function CategoryBox({ type }: { type: CategoryType }) {
  const navigate = useNavigate();

  const categoryType: CategoryListType = {
    LANG: {
      title: '언어영역',
      description: '언어 이해력 및 표현 능력 평가',
      tags: ['어휘력', '문법과 구문', '독해 및 추론'],
    },
    MATH: {
      title: '수리영역',
      description: '수학적 사고 능력과 문제 해결 능력 평가',
      tags: ['산수', '수치 추론', '대수 및 기하학'],
    },
    DEDUCE: {
      title: '추리영역',
      description: '논리적 사고, 분석 능력 및 결론 도출 능력을 평가',
      tags: ['논리 추리', '상황적 추리'],
    },
    SPATIAL: {
      title: '공간지각영역',
      description: '공간적 이해와 조작 능력을 평가',
      tags: ['COMING SOON'],
    },
  };

  return (
    <div
      onClick={() => {
        if (type === 'SPATIAL') {
          return;
        }
        navigate(`/question`, { state: { category: type } });
      }}
      className={`relative flex min-h-[144px] w-full overflow-hidden rounded-8 border border-sub_200 ${type === 'SPATIAL' ? 'cursor-not-allowed' : 'cursor-pointer'}`}
    >
      <div className="flex shrink-0 basis-1/3 items-center justify-center bg-sub_200 ">
        {type === 'LANG' ? (
          <Language className="h-auto w-auto" />
        ) : type === 'MATH' ? (
          <Math className="h-auto w-auto" />
        ) : type === 'DEDUCE' ? (
          <Reasoning className="h-auto w-auto" />
        ) : (
          <Space className="h-auto w-auto" />
        )}
      </div>
      <div className="flex grow flex-col items-start px-4 py-6">
        <div className="flex w-full justify-start">
          <div className="grow text-gray_600">
            <div className="mb-4 text-16 font-bold leading-none">{categoryType[type].title}</div>
            <div className="leading-4">
              <div className="text-12 font-medium ">영역 목표</div>
              <div className="whitespace-wrap text-10 font-normal">{categoryType[type].description}</div>
            </div>
          </div>
          {type === 'SPATIAL' ? (
            <UnableStartBtn className="w-[32px] shrink-0" />
          ) : (
            <StartBtn className="w-[32px] h-auto shrink-0 cursor-pointer" />
          )}
        </div>
        <div className="mt-2 box-border flex w-full flex-wrap justify-start gap-x-2 gap-y-2 leading-none">
          {categoryType[type].tags.map((tag, index) => (
            <div
              key={index}
              className="flex items-center rounded-12 bg-sub_300 px-3 py-[7px] text-center text-10 font-medium text-white "
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CategoryBox;
