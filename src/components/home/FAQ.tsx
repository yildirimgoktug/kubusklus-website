import { useTranslations } from 'next-intl';
import FAQAccordion from './FAQAccordion';

const KEYS = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8'];

export default function FAQ() {
  const t = useTranslations('FAQ');
  const items = Object.fromEntries(
    KEYS.map((k) => [k, { question: t(`${k}.question`), answer: t(`${k}.answer`) }]),
  );
  return <FAQAccordion content={{ eyebrow: t('eyebrow'), title: t('title'), items }} />;
}
