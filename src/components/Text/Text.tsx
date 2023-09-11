import * as React from 'react'
import './Text.scss'


export type TextProps = {
    /** Дополнительный класс */
    className?: string;
    /** Стиль отображения */
    view?: 'title' | 'button' | 'p-20' | 'p-18' | 'p-16' | 'p-14';
    /** Html-тег */
    tag?:  'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'p' | 'span';
    /** Начертание шрифта */
    weight?: 'normal' | 'medium' | 'bold';
    /** Контент */
    children: React.ReactNode;
    /** Цвет */
    color?: 'primary' | 'secondary' | 'accent';
    /** Максимальное кол-во строк */
    maxLines?: number;
};

const Text: React.FC<TextProps> = ({
    className,
    view,
    tag ='p',
    weight,
    children,
    color,
    maxLines,
}) =>{
    let colorCustom;
    let weightCustom;
    if (color==='accent') { colorCustom='var(--text-accent)'}
    if (color==='primary') { colorCustom='var(--text-primary)'}
    if (color==='secondary') { colorCustom='var(--text-secondary)'}
    if (weight==='medium') {weightCustom=600}
    if (weight==='bold') {weightCustom=700}
    if (weight==='normal') {weightCustom=400}
    const style: React.CSSProperties = {
        fontFamily: 'Roboto',
        color: colorCustom || 'inherit',
        fontWeight: weightCustom || 'inherit',
        overflow: maxLines ? 'hidden': 'visible',
        textOverflow: maxLines ? 'ellipsis' : 'clip',
        display: '-webkit-box',
        WebkitLineClamp: maxLines,
        WebkitBoxOrient: 'vertical',
        textDecoration: 'none',

    }
    if (view) {
        className=`${className || ''} ${view}`;
    }
    return React.createElement(
        tag,
        { className, style },
        children
      );
}

export default Text;
