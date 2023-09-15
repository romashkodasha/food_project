import React from "react";
import Text from "../Text/Text";
import styles from "./Card.module.scss";

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
    <div className={`${styles.card} ${styles[className]}`} onClick={onClick}>
      <div className={styles.card_image_container}>
        <img src={image} alt="card" className={styles.card_image} />
      </div>
      <div className={styles.card_body}>
        <div className={styles.card_info}>
          {captionSlot && (
            <Text
              view="p-14"
              color="secondary"
              weight="medium"
            >
              {captionSlot}
            </Text>
          )}

          <Text view="p-20" weight="medium" maxLines={2}>
            {title}
          </Text>
          <Text
            view="p-16"
            color="secondary"
            maxLines={3}
          >
            {subtitle}
          </Text>
        </div>
        <div className={styles.card_footer}>
          {contentSlot && (
            <Text  view="p-18" weight="bold">
              {contentSlot}
            </Text>
          )}
          {actionSlot && <div className={styles.card_action}>{actionSlot}</div>}
        </div>
      </div>
    </div>
  );
};

export default Card;
