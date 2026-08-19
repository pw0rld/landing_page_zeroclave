import pageHtml from './page.html?raw';
import './styles.css';

const app = document.querySelector<HTMLDivElement>('#app');

if (!app) {
  throw new Error('Missing #app container');
}

app.innerHTML = pageHtml;

document.querySelectorAll<HTMLAnchorElement>('[data-core-tab]').forEach((tab) => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('[data-core-tab]').forEach((item) => item.classList.remove('active'));
    tab.classList.add('active');
  });
});

type SolutionDetail = {
  title: string;
  copy: string;
  tags: string;
};

const solutionDetails: Record<string, SolutionDetail> = {
  law: {
    title: '法律工作拥抱 AI，客户隐私留在律所',
    copy:
      '合同、案件材料、客户信息和历史办案经验是律师使用 AI 的核心上下文，而这些数据往往也是律所最不能直接暴露给外部模型的资产。\nZeroClave 能够在知识进入云端知识库、问题发往大模型之前完成敏感信息双链路保护，让律师继续使用云端大模型的同时减少客户信息与律所知识资产暴露。',
    tags: '知识资产保护｜敏感信息不出域｜全程调用留痕',
  },
  government: {
    title: 'AI 提效，安全边界需铸牢',
    copy:
      '政策咨询、材料审核、政务热线等业务正在接入 AI，但政务数据通常跨部门、分权限、分敏感等级管理。\nZeroClave 在政务系统与大模型之间建立统一安全控制层，根据数据类型和业务权限控制信息进入模型的范围，并记录关键调用过程，让 AI 能力接入现有政务体系，而不改变原有安全边界。',
    tags: '数据边界控制｜按需最小可见｜全链路审计',
  },
  medical: {
    title: '隐去患者身份，保留诊疗上下文',
    copy:
      '病历总结、报告解读、智能问诊等场景需要 AI 理解完整的诊疗信息。因此，需要隐藏患者身份的同时，尽可能保留病史、症状、检查指标等关键医学语义。\nZeroClave 在医疗数据进入大模型前识别并保护身份信息，并根据诊疗场景保留必要上下文，让隐私保护不以牺牲 AI 的医学理解能力为代价。',
    tags: '患者身份保护｜诊疗语义保留｜医疗数据安全调用',
  },
  finance: {
    title: 'AI 懂客户，但不必认识客户',
    copy:
      '理财 Agent 正在为用户提供资产配置、产品推荐和智能问答，精准个性化服务的同时，用户的身份、资产、交易记录与风险偏好等敏感金融数据不可避免涌入云端。\nZeroClave 在数据离开业务环境前完成敏感信息识别与保护，AI 保留推荐所需的全部语义，而无需直接接触用户真实身份与完整敏感数据。',
    tags: '金融数据保护｜个性化语义保留｜Agent 安全接入',
  },
};

const dialog = document.querySelector<HTMLDialogElement>('#solution-dialog');
const dialogTitle = dialog?.querySelector<HTMLElement>('[data-dialog-title]');
const dialogCopy = dialog?.querySelector<HTMLElement>('[data-dialog-copy]');
const dialogTags = dialog?.querySelector<HTMLElement>('[data-dialog-tags]');

document.querySelectorAll<HTMLButtonElement>('[data-solution]').forEach((button) => {
  button.addEventListener('click', () => {
    const detail = solutionDetails[button.dataset.solution ?? ''];
    if (!dialog || !dialogTitle || !dialogCopy || !dialogTags || !detail) {
      return;
    }

    dialogTitle.textContent = detail.title;
    dialogCopy.textContent = detail.copy;
    dialogTags.textContent = detail.tags;
    dialog.showModal();
  });
});

dialog?.querySelector<HTMLButtonElement>('.dialog-close')?.addEventListener('click', () => {
  dialog.close();
});

dialog?.addEventListener('click', (event) => {
  if (event.target === dialog) {
    dialog.close();
  }
});
