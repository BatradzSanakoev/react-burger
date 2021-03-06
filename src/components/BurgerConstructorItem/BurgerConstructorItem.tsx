import React, { useRef } from 'react';
import { useDispatch } from '../../services/hooks';
import { useDrag, useDrop } from 'react-dnd';
import { CurrencyIcon, DragIcon, LockIcon, DeleteIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructorItem from './BurgerConstructorItem.module.css';
import { decreaseConstructorCount, deleteConstructorIngredient, updateConstructorIngredients } from '../../services/actions/burgerConstructor';

type TBurgerConstructorItemProps = {
  uniqueKey?: string;
  index?: number;
  type?: string;
  image?: string;
  name: string;
  price: number;
};

const BurgerConstructorItem = (props: TBurgerConstructorItemProps) => {
  const dispatch = useDispatch();
  const ref = useRef<HTMLDivElement>(null);
  const burgerTopBottomNote = () => {
    if (!props.type) return '';
    if (props.type === 'bun-top') return '(верх)';
    if (props.type === 'bun-bottom') return '(низ)';
  };
  const burgerTopBottomClass = () => {
    if (!props.type) return burgerConstructorItem.itemData;
    if (props.type === 'bun-top') return burgerConstructorItem.itemDataBunTop;
    if (props.type === 'bun-bottom') return burgerConstructorItem.itemDataBunBottom;
  };

  const handleDeleteIngredient = () => {
    dispatch(deleteConstructorIngredient(props.uniqueKey!));
    dispatch(decreaseConstructorCount());
  };

  const [, dropRef] = useDrop({
    accept: 'constructor',
    hover: (item: TBurgerConstructorItemProps, monitor) => {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = props.index;
      if (dragIndex === hoverIndex) return;
      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;
      if (dragIndex! < hoverIndex! && hoverClientY < hoverMiddleY) return;
      if (dragIndex! > hoverIndex! && hoverClientY > hoverMiddleY) return;
      dispatch(updateConstructorIngredients(dragIndex!, hoverIndex!));
      item.index = hoverIndex;
    }
  });

  const [{ opacity }, dragRef] = useDrag({
    type: 'constructor',
    item: { index: props.index },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0 : 1
    })
  });

  dragRef(dropRef(ref));

  return (
    <div
      className={`${burgerConstructorItem.item}`}
      style={{ justifyContent: `${props.type && 'flex-end'}`, opacity: `${opacity}` }}
      ref={!props.type ? ref : null}>
      {!props.type && <DragIcon type='primary' />}
      <div className={`${burgerTopBottomClass()} pl-6 pt-4 pb-4 pr-8`}>
        <img alt='item-card' src={props.image} className={burgerConstructorItem.image} />
        <p className={`text text_type_main-medium ${burgerConstructorItem.name}`}>{`${props.name} ${burgerTopBottomNote()}`}</p>
        <div className={burgerConstructorItem.price}>
          <p className={`text text_type_main-medium ${burgerConstructorItem.priceValue}`}>{props.price}</p>
          <CurrencyIcon type='primary' />
        </div>
        {props.type ? <LockIcon type='secondary' /> : <DeleteIcon type='primary' onClick={handleDeleteIngredient} />}
      </div>
    </div>
  );
};

export default BurgerConstructorItem;
