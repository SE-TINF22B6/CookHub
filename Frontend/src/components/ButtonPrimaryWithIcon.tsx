import { FunctionComponent, useMemo, type CSSProperties } from "react";
import "../design/ButtonPrimaryWithIcon.css";

type ButtonPrimaryWithIconType = {
    buttonText?: string;
    showIcon?: boolean;

    /** Style props */
    buttonPrimaryWithIconBackgroundColor?: CSSProperties["backgroundColor"];
    buttonPrimaryWithIconWidth?: CSSProperties["width"];
    buttonPrimaryWithIconPosition?: CSSProperties["position"];
    buttonPrimaryWithIconTop?: CSSProperties["top"];
    buttonPrimaryWithIconLeft?: CSSProperties["left"];
    buttonPrimaryWithIconBorderRadius?: CSSProperties["borderRadius"];
    buttonPrimaryWithIconHeight?: CSSProperties["height"];
    frameDivWidth?: CSSProperties["width"];
    buttonNameFontWeight?: CSSProperties["fontWeight"];
    buttonNameFontFamily?: CSSProperties["fontFamily"];
    buttonNameColor?: CSSProperties["color"];
    buttonNameTextAlign?: CSSProperties["textAlign"];
    buttonNameDisplay?: CSSProperties["display"];
    buttonNameTextTransform?: CSSProperties["textTransform"];
    buttonNameAlignItems?: CSSProperties["alignItems"];
    buttonNameWidth?: CSSProperties["width"];
    buttonNameFlexShrink?: CSSProperties["flexShrink"];
    buttonNameJustifyContent?: CSSProperties["justifyContent"];
};

const ButtonPrimaryWithIcon: FunctionComponent<ButtonPrimaryWithIconType> = ({
                                                                                 buttonText,
                                                                                 showIcon,
                                                                                 buttonPrimaryWithIconBackgroundColor,
                                                                                 buttonPrimaryWithIconWidth,
                                                                                 buttonPrimaryWithIconPosition,
                                                                                 buttonPrimaryWithIconTop,
                                                                                 buttonPrimaryWithIconLeft,
                                                                                 buttonPrimaryWithIconBorderRadius,
                                                                                 buttonPrimaryWithIconHeight,
                                                                                 frameDivWidth,
                                                                                 buttonNameFontWeight,
                                                                                 buttonNameFontFamily,
                                                                                 buttonNameColor,
                                                                                 buttonNameTextAlign,
                                                                                 buttonNameDisplay,
                                                                                 buttonNameTextTransform,
                                                                                 buttonNameAlignItems,
                                                                                 buttonNameWidth,
                                                                                 buttonNameFlexShrink,
                                                                                 buttonNameJustifyContent,
                                                                             }) => {
    const buttonPrimaryWithIconStyle: CSSProperties = useMemo(() => {
        return {
            backgroundColor: buttonPrimaryWithIconBackgroundColor,
            width: buttonPrimaryWithIconWidth,
            position: buttonPrimaryWithIconPosition,
            top: buttonPrimaryWithIconTop,
            left: buttonPrimaryWithIconLeft,
            borderRadius: buttonPrimaryWithIconBorderRadius,
            height: buttonPrimaryWithIconHeight,
        };
    }, [
        buttonPrimaryWithIconBackgroundColor,
        buttonPrimaryWithIconWidth,
        buttonPrimaryWithIconPosition,
        buttonPrimaryWithIconTop,
        buttonPrimaryWithIconLeft,
        buttonPrimaryWithIconBorderRadius,
        buttonPrimaryWithIconHeight,
    ]);

    const frameDivStyle: CSSProperties = useMemo(() => {
        return {
            width: frameDivWidth,
        };
    }, [frameDivWidth]);

    const buttonNameStyle: CSSProperties = useMemo(() => {
        return {
            fontWeight: buttonNameFontWeight,
            fontFamily: buttonNameFontFamily,
            color: buttonNameColor,
            textAlign: buttonNameTextAlign,
            display: buttonNameDisplay,
            textTransform: buttonNameTextTransform,
            alignItems: buttonNameAlignItems,
            width: buttonNameWidth,
            flexShrink: buttonNameFlexShrink,
            justifyContent: buttonNameJustifyContent,
        };
    }, [
        buttonNameFontWeight,
        buttonNameFontFamily,
        buttonNameColor,
        buttonNameTextAlign,
        buttonNameDisplay,
        buttonNameTextTransform,
        buttonNameAlignItems,
        buttonNameWidth,
        buttonNameFlexShrink,
        buttonNameJustifyContent,
    ]);

    return (
        <div className="buttonprimarywith-icon" style={buttonPrimaryWithIconStyle}>
            <div className="button-name-parent" style={frameDivStyle}>
                <div className="button-name" style={buttonNameStyle}>
                    {buttonText}
                </div>
                {showIcon && (
                    <div className="icon">
                        <img
                            className="iconoutlinearrow-right"
                            alt=""
                            src="../assets/iconoutlinearrowright.svg"
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ButtonPrimaryWithIcon;
