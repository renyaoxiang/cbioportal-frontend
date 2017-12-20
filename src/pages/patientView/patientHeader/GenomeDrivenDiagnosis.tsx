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
    Diagnosed_Cancer_Type: string;
    Diagnosed_Cancer_Type_Detailed: string;
}

interface IGenomeDrivenDiagnosisProps {
    prediction: GDDOutput;
}

export default class GenomeDrivenDiagnosis extends React.Component<IGenomeDrivenDiagnosisProps, {}> {
    public render() {
        return (
            <DefaultTooltip
                placement='bottomLeft'
                trigger={['hover', 'focus']}
                overlay={this.tooltipContent()}
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
        if (this.props.prediction.Pred1 && this.cleanCancerType(this.props.prediction.Pred1).toLowerCase() === this.cleanCancerType(this.props.prediction.Diagnosed_Cancer_Type).toLowerCase()) {
            return <a>(GDD)</a>
        } else {
            return <a>(GDD: <span data-test="gdd-prediction">{this.cleanCancerType(this.props.prediction.Pred1)}</span>)</a>
        }
    }

    private tooltipContent() {
        return (
            <div style={{maxWidth:250}}>
                <h6 style={{textAlign:"center"}}>
                    Genome Driven Diagnosis (GDD)
                </h6>
                <SimpleTable
                    headers={[
                        <th>Cancer Type</th>,
                        <th>Confidence</th>
                    ]}
                    rows={[
                        <tr><td>{this.cleanCancerType(this.props.prediction.Pred1)}</td><td>{this.progressBar(this.props.prediction.Conf1, true)}</td></tr>,
                        <tr><td>{this.cleanCancerType(this.props.prediction.Pred2)}</td><td>{this.progressBar(this.props.prediction.Conf2, false)}</td></tr>,
                        <tr><td>{this.cleanCancerType(this.props.prediction.Pred3)}</td><td>{this.progressBar(this.props.prediction.Conf3, false)}</td></tr>
                    ]}
                />
                <hr style={{marginTop:10,marginBottom:10}}/>
                <span className="small">
                    <b>Genome Driven Diagnosis (GDD)</b> predicts probability for 22 tumor
                    types based on genomic features, using a calibrated RandomForest
                    algorithm.
                </span>
            </div>
        );
    }

    private progressBar(confidence:string, determineColor:boolean) {
        let confidencePerc = Math.round(parseFloat(confidence) * 100);

        let progressBarStyle:string = "progress-bar-info";
        if (determineColor) {
            if (confidencePerc > 50) {
                progressBarStyle = "progress-bar-success";
            } else if (confidencePerc > 5) {
                progressBarStyle = "progress-bar-warning";
            } else {
                progressBarStyle = "progress-bar-danger";
            }
        }

        return (
            <div className="progress" style={{position:"relative",width:100,marginBottom:0}}>
                <div className={`progress-bar ${progressBarStyle}`}
                     role="progressbar" aria-valuenow={`${confidencePerc}`}
                     aria-valuemin="0" aria-valuemax="100"
                     style={{width:`${confidencePerc}%`}} />
                 <div style={{position:"absolute",
                              textShadow:"-1px 0 white, 0 1px white, 1px 0 white, 0 -1px white",
                              width:100,
                              marginTop:2,
                              textAlign:"center"}}
                  >{confidencePerc}%</div>
            </div>
        );
    }

    private cleanCancerType(cancerType:string) {
        return cancerType.replace(/\./g," ").replace("Non S", "Non-S");
    }
}
