import { useEffect, useState } from 'react';
import './Line.css';

function Line(props){
    const [ display_position, set_display_position ] = useState('bottom-invisible');

    const positions = {
        "top-invisible": {
            opacity: 0,
            transform: 'translateY(-250%)',
        },
        "top": {
            opacity: 1,
            transform: 'translateY(-150%)',
        },
        "middle": {
            opacity: 1,
            transform: 'translateY(0%)',
        },
        "bottom": {
            opacity: 1,
            transform: 'translateY(150%)',
        },
        "bottom-invisible": {
            opacity: 0,
            transform: 'translateY(250%)',
        },
    };
   
    const onTimeChange = (event) => {
        let currentTime = event.detail.currentTime;
        if(currentTime === props.targetTime){
            window.dispatchEvent(new window.CustomEvent('lineIndexChange', {detail: { index: props.index } }));
        }
    }

    const onLineIndexChange = (event) => {
    
        let _index = event.detail.index;

        // console.log(`props.index: ${props.index} -> currentIndex: ${_index}`, _index === props.index, props.targetTime, props.text);

        if((_index - 2) === props.index){
            set_display_position("top-invisible"); 
            return;
        }

        if((_index - 1) === props.index){
            set_display_position("top"); 
            return;
        }

        if(_index === props.index){
            set_display_position("middle"); 
            return;
        }

        
        if((_index + 1) === props.index){
            set_display_position("bottom"); 
            return;
        }
        
        if((_index + 2) === props.index){
            set_display_position("bottom-invisible");
            return; 
        }

        set_display_position("bottom-invisible");

        
    }

    useEffect(() => {
        console.log(props.index, display_position);
    }, [display_position]);

    useEffect(() => {
        window.addEventListener('onTimeChange', onTimeChange);
        window.addEventListener('lineIndexChange', onLineIndexChange);

        return (() => {
            window.removeEventListener('onTimeChange', onTimeChange);
            window.removeEventListener('lineIndexChange', onLineIndexChange);
        });
    }, [])



    return (
        <div    data-index={props.index} 
                data-target-time={props.targetTime} 
                className={`line${ display_position === 'middle' ? " middle" : "" }`}
                style={positions[display_position]}>
            {props.text}
        </div>
    );
    
}

export default Line;