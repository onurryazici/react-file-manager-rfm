export function DispatchCaller(dispatchObject,typeValue,payloadValue)
{
    let dispatch = dispatchObject;
    return dispatch({type:typeValue, payload:payloadValue});
}  