import { Suspense } from 'react';
import BlackholeCanvas from './Blackhole';
import SpacemanCanvas from './Spaceman';

const Background = ({ 
    model1 = 'spaceman', 
    model2 = 'blackhole', 
    model3 = 'cloudstation',
    opacity1 = 1,
    opacity2 = 1,
    opacity3 = 1
}) => {
    const renderModel = (model, zIndex, opacity) => {
        switch(model) {
            case 'spaceman':
                return (
                    <div 
                        className="fixed inset-0 z-[-1] pointer-events-none" 
                        style={{ opacity: opacity }}
                    >
                        <Suspense fallback={null}>
                            <SpacemanCanvas />
                        </Suspense>
                    </div>
                );
            case 'blackhole':
                return (
                    <div 
                        className="fixed inset-0 z-[-1] pointer-events-none" 
                        style={{ opacity: opacity }}
                    >
                        <Suspense fallback={null}>
                            <BlackholeCanvas />
                        </Suspense>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <>
            {renderModel(model1, -1, opacity1)}
            {renderModel(model2, -2, opacity2)}
            {renderModel(model3, -3, opacity3)}
        </>
    );
};

export default Background;