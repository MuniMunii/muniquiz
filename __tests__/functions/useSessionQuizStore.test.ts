// /**
//  * @jest-environment jsdom
//  */
// import "@testing-library/jest-dom";
// import { useSessionQuizStore } from "@/app/quiz/[slug]/[number]/store/SessionQuizStore";
// import cloneDeep from "lodash.clonedeep";
// jest.mock("nanoid", () => {
//   let counter = 0;
//   return {
//     nanoid: () => `mock-nano-id-${counter++}`,
//   };
// });
//   function snapshotQuizzes() {
//   return cloneDeep(useSessionQuizStore.getState().answerState);
// }
// describe('useSessionQuiz Store Zustand',()=>{
//     beforeEach(()=>{useSessionQuizStore.setState({
//         answerState:[
//             {id:'Question-1',title:'Question 1 dummy',answer_choice:
//             [
//                 {question_id:'Question-1-answerchoice-1',answer_question:'Dummyanswer-1',answer:false},
//                 {question_id:'Question-1-answerchoice-2',answer_question:'Dummyanswer-2',answer:false},
//                 {question_id:'Question-1-answerchoice-3',answer_question:'Dummyanswer-3',answer:false}
//             ]
//         },
//         {id:'Question-2',title:'Question 2 dummy',answer_choice:
//             [
//                 {question_id:'Question-2-answerchoice-1',answer_question:'Dummyanswer-1',answer:false},
//                 {question_id:'Question-2-answerchoice-2',answer_question:'Dummyanswer-2',answer:false},
//                 {question_id:'Question-2-answerchoice-3',answer_question:'Dummyanswer-3',answer:false}
//             ]
//         }
//         ]
//     })})
//     afterEach(()=>{useSessionQuizStore.setState({
//         answerState:[
//             {id:'Question-1',title:'Question 1 dummy',answer_choice:
//             [
//                 {question_id:'Question-1-answerchoice-1',answer_question:'Dummyanswer-1',answer:false},
//                 {question_id:'Question-1-answerchoice-2',answer_question:'Dummyanswer-2',answer:false},
//                 {question_id:'Question-1-answerchoice-3',answer_question:'Dummyanswer-3',answer:false}
//             ]
//         },
//         {id:'Question-2',title:'Question 2 dummy',answer_choice:
//             [
//                 {question_id:'Question-2-answerchoice-1',answer_question:'Dummyanswer-1',answer:false},
//                 {question_id:'Question-2-answerchoice-2',answer_question:'Dummyanswer-2',answer:false},
//                 {question_id:'Question-2-answerchoice-3',answer_question:'Dummyanswer-3',answer:false}
//             ]
//         }
//         ]
//     })})
// })