import * as React from "react";
import DefaultTooltip from "shared/components/defaultTooltip/DefaultTooltip";
import {placeArrowBottomLeft} from "shared/components/defaultTooltip/DefaultTooltip";
import SimpleTable from "shared/components/simpleTable/SimpleTable";
import FontAwesome from "react-fontawesome";

export type GDDOutput = {
    Pred1: string;
    Pred2: string;
    Pred3: string;
    Conf1: string;
    Conf2: string;
    Conf3: string;
}

interface IGenomeDrivenDiagnosisProps {
    prediction: GDDOutput;
    sampleCancerType?: string;
}

export default class GenomeDrivenDiagnosis extends React.Component<IGenomeDrivenDiagnosisProps, {}> {
    public render() {
        return (
            <DefaultTooltip
                placement='bottomLeft'
                trigger={['hover', 'focus']}
                overlay={this.tooltipContent()}
                arrowContent={<div className="rc-tooltip-arrow-inner" />}
                destroyTooltipOnHide={false}
                onPopupAlign={placeArrowBottomLeft}
            >
                <span style={{paddingLeft:2}}>
                    {this.predictionContent()}
                </span>
            </DefaultTooltip>
        );
    }

    private predictionContent() {
        if (this.props.prediction.Pred1 && this.props.sampleCancerType && this.props.prediction.Pred1.toLowerCase() === this.props.sampleCancerType.toLowerCase()) {
            return <a>(GDD: <i className='fa fa-check' aria-hidden="true"></i>)</a>
        } else {
            return <a>(GDD Prediction: {this.cleanCancerType(this.props.prediction.Pred1)})</a>
        }
    }

    private tooltipContent() {
        return (
            <div>
                <h6 style={{textAlign:"center"}}>
                    Genome Driven Diagnosis (GDD)
                    <DefaultTooltip
                        mouseEnterDelay={0}
                        placement="right"
                        overlay={<span>Predicted probability for 22 tumor types
                            based on genomic features, using a calibrated
                            RandomForest algorithm.</span>}
                    >
                        <span style={{paddingLeft: 2}}><FontAwesome name='question-circle'/></span>
                    </DefaultTooltip>
                </h6>
                <SimpleTable 
                    headers={[
                        <th></th>,
                        <th>Cancer Type</th>,
                        <th>Confidence</th>
                    ]}
                    rows={[
                        <tr><td>1</td><td>{this.cleanCancerType(this.props.prediction.Pred1)}</td><td>{this.props.prediction.Conf1}</td></tr>,
                        <tr><td>2</td><td>{this.cleanCancerType(this.props.prediction.Pred2)}</td><td>{this.props.prediction.Conf2}</td></tr>,
                        <tr><td>3</td><td>{this.cleanCancerType(this.props.prediction.Pred3)}</td><td>{this.props.prediction.Conf3}</td></tr>
                    ]}
                />
            </div>
        );
    }

    private tableRows() {
        return
    }

    private cleanCancerType(cancerType:string) {
        return cancerType.replace(/\./g," ").replace("Non S", "Non-S");
    }
}
