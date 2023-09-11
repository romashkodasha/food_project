import React from "react";
import Text from "../Text/Text";
import "./Card.scss";

export type CardProps = {
  /** Дополнительный classname */
  className?: string;
  /** URL изображения */
  image: string;
  /** Слот над заголовком */
  captionSlot?: React.ReactNode;
  /** Заголовок карточки */
  title: React.ReactNode;
  /** Описание карточки */
  subtitle: React.ReactNode;
  /** Содержимое карточки (футер/боковая часть), может быть пустым */
  contentSlot?: React.ReactNode;
  /** Клик на карточку */
  onClick?: React.MouseEventHandler;
  /** Слот для действия */
  actionSlot?: React.ReactNode;
};

const Card: React.FC<CardProps> = ({
  className,
  image,
  captionSlot,
  title,
  subtitle,
  contentSlot,
  onClick,
  actionSlot,
}) => {
  if (className === undefined) {
    className = "";
  }
  return (
    <div className={`card ${className}`} onClick={onClick}>
      <div className='card-image-container'>
        <img src={image} alt="card" className="card-image" />
      </div>
      <div className="card-body">
        <div className="card-info">
          {captionSlot && (
            <Text
              className="card-caption"
              view="p-14"
              color="secondary"
              weight="medium"
            >
              {captionSlot}
            </Text>
          )}

          <Text className="card-title" view="p-20" weight="medium" maxLines={2}>
            {title}
          </Text>
          <Text
            className="card-subtitle"
            view="p-16"
            color="secondary"
            maxLines={3}
            data-testid="text"
          >
            {subtitle}
          </Text>
        </div>
        <div className="card-footer">
          {contentSlot && (
            <Text className="card-content" view="p-18" weight="bold">
              {contentSlot}
            </Text>
          )}
          {actionSlot && <div className="card-action">{actionSlot}</div>}
        </div>
      </div>
    </div>
  );
};

export default Card;
