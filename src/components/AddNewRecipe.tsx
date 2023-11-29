import { FunctionComponent } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form } from "react-bootstrap";
import InputImageIcon from "./InputImageIcon";
import styles from "./AddNewRecipe.module.css";

const AddNewRecipe: FunctionComponent = () => {
  return (
    <div className={styles.addnewrecipe}>
      <div className={styles.bodyframe}>
        <div className={styles.bodyframeChild} />
        <div className={styles.favorite} />
        <div className={styles.bodyframeItem} />
      </div>
      <div className={styles.btnRedGreen}>
        <button className={styles.btnDeleteAll}>
          <div className={styles.deleteinputWrapper}>
            <div className={styles.deleteinputWrapper}>
              <div className={styles.buttonprimarywithIcon}>
                <div className={styles.deleteParent}>
                  <div className={styles.delete}>Delete all</div>
                  <div className={styles.icon}>
                    <img
                      className={styles.iconoutlinearrowRight}
                      alt=""
                      src="/iconoutlinearrowright.svg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </button>
        <button className={styles.btnSaveRezipe}>
          <div className={styles.txtBackToProfileWrapper}>
            <div className={styles.txtBackToProfileWrapper}>
              <div className={styles.buttonprimarywithIcon1}>
                <div className={styles.deleteParent}>
                  <div className={styles.buttonName}>{`Save recipe `}</div>
                  <div className={styles.icon}>
                    <img
                      className={styles.iconoutlinearrowRight}
                      alt=""
                      src="/iconoutlinearrowright.svg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </button>
      </div>
      <div className={styles.bodyinputs}>
        <ul className={styles.inputingredients}>
          <div className={styles.inputingredientsChild} />
        </ul>
        <Form.Group className={styles.inputinstructionFormgroup}>
          <Form.Control as="textarea" defaultValue="" />
        </Form.Group>
        <InputImageIcon />
      </div>
      <div className={styles.header}>
        <div className={styles.headerChild} />
        <div className={styles.myRecipe}>My recipe</div>
        <div className={styles.headerItem} />
        <img className={styles.hamburgy1Icon} alt="" src="/hamburgy-1@2x.png" />
      </div>
      <div className={styles.sushirolls}>
        <img
          className={styles.sushiface2Icon}
          alt=""
          src="/sushiface2@2x.png"
        />
        <img
          className={styles.sushiface3Icon}
          alt=""
          src="/sushiface3@2x.png"
        />
        <img
          className={styles.shushiface1Icon}
          alt=""
          src="/shushiface1@2x.png"
        />
      </div>
      <div className={styles.btnBackToProfile}>
        <div className={styles.txtBackToProfileWrapper}>
          <div className={styles.txtBackToProfileWrapper}>
            <div className={styles.buttonprimarywithIcon1}>
              <div className={styles.deleteParent}>
                <div className={styles.buttonName1}>Back to profile</div>
                <div className={styles.icon}>
                  <img
                    className={styles.iconoutlinearrowRight}
                    alt=""
                    src="/iconoutlinearrowright.svg"
                  />
                </div>
              </div>
            </div>
          </div>
          <img
            className={styles.fontAwesomeRemovebgPreviewIcon}
            alt=""
            src="/20231020-10-46-56font-awesomeremovebgpreview-1@2x.png"
          />
        </div>
      </div>
    </div>
  );
};

export default AddNewRecipe;
