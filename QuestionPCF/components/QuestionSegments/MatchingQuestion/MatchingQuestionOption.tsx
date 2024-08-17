import {
  IconButton,
  IStackStyles,
  makeStyles,
  setVirtualParent,
  Stack,
  TextField,
  TooltipHost,
  Image,
  IImageStyles,
  IIconStyles,
  IIconProps
} from "@fluentui/react";
import { observer } from "mobx-react-lite";
import React from "react";
import { IOption, IPromise } from "../../../cdsService/cdsSerivce";
import { useVM } from "../../../viewModels/context";
import OrderArrows from "../../UI/OrderArrows";
import { ILineError } from "./MatchingQuestion";
import { useControlledTitle } from "./useControlledTitle";

const useStyles = makeStyles({
  showOnHover: {
    " .showAndHide": {
      display: "none",
      TransitionEvent: "display 0.5s ease-in-out",
    },
    ":hover .showAndHide": {
      display: "block",
      TransitionEvent: "display 0.5s ease-in-out",
    }
  },
})

interface props {
  option: IOption,
  promise: IPromise;
  lineError: ILineError
  validateInput: (index: number, type: "option" | "promise") => void
  removeOption: (index: number) => void
  index: number,
  promiseIndex: number,
}

const MatchingQuestionOption = ({ option, promise, index, promiseIndex, lineError, validateInput, removeOption }: props) => {
  const vm = useVM();
  const styles = useStyles();
  const {
    controlledTitle: controlledOptionTitle,
    setControlledTitle: setControlledOptionTitle,
    writeTitle: writeOptionTitle,
    resetTimer: resetOptionTimer
  } = useControlledTitle(vm, option.title, index, lineError, validateInput, "option")
  const {
    controlledTitle: controlledPromiseTitle,
    setControlledTitle: setControlledPromiseTitle,
    writeTitle: writePromiseTitle,
    resetTimer: resetPromiseTimer
  } = useControlledTitle(vm, promise?.title, promiseIndex, lineError, validateInput, "promise")

  const imageClickHandler = (event: any, index: number, field: "option" | "promise") => {
    Promise.resolve().then(() => {
      const inputElement = document.createElement("input");
      inputElement.style.visibility = "hidden";
      inputElement.setAttribute("type", "file");
      inputElement.setAttribute("accept", "image/jpg, image/jpeg, image/png");

      document.body.appendChild(inputElement);

      const target = event?.target as HTMLElement | undefined;

      if (target) {
        setVirtualParent(inputElement, target);
      }
      inputElement.onchange = async (ev: any) => {
        const files = ev.target.files || ev.dataTransfer.files
        if (field == "option") {
          if (files) {
            vm.QuestionMatchingOptions[index].imageUrl = URL.createObjectURL(files[0])
            vm.QuestionMatchingOptions[index].image = files[0] as File;
            vm.QuestionMatchingOptions = [...vm.QuestionMatchingOptions];
          } else {
            console.log("no files")
            vm.QuestionMatchingOptions[index].imageUrl = undefined;
            vm.QuestionMatchingOptions[index].image = undefined;
            vm.QuestionMatchingOptions = [...vm.QuestionMatchingOptions];
          }
        } else {
          if (files) {
            vm.QuestionMatchingPromises[index].imageUrl = URL.createObjectURL(files[0])
            vm.QuestionMatchingPromises[index].image = files[0] as File;
            vm.QuestionMatchingPromises = [...vm.QuestionMatchingPromises];
          } else {
            console.log("no files")
            vm.QuestionMatchingPromises[index].imageUrl = undefined;
            vm.QuestionMatchingPromises[index].image = undefined;
            vm.QuestionMatchingPromises = [...vm.QuestionMatchingPromises];
          }
        }
      };

      inputElement.click();

      if (target) {
        setVirtualParent(inputElement, null);
      }

      setTimeout(() => {
        inputElement.remove();
      }, 30000);
    });
  }

  const deleteImage = async (index: number, field: "option" | "promise") => {
    if (field == "option") {
      vm.QuestionMatchingOptions[index].imageUrl = undefined;
      vm.QuestionMatchingOptions[index].image = undefined;
      vm.QuestionMatchingOptions = [...vm.QuestionMatchingOptions];
    } else {
      vm.QuestionMatchingPromises[index].imageUrl = undefined;
      vm.QuestionMatchingPromises[index].image = undefined;
      vm.QuestionMatchingPromises = [...vm.QuestionMatchingPromises];
    }
  }

  return (
    <Stack.Item order={option.order} key={index}>
      <Stack horizontal verticalAlign="center" horizontalAlign="space-between" styles={{ root: { width: "100%" } } as IStackStyles} tokens={{ childrenGap: "0.5em" }}>
        <Stack grow>
          <Stack className={styles.showOnHover} horizontal styles={{ root: { width: "100%" } } as IStackStyles} tokens={{ childrenGap: "0.5em" }} verticalAlign="center">
            {!vm.isReadOnly && (
              <Stack styles={{ root: { width: "2em" } }} disableShrink>
                <OrderArrows order={option.order} index={index} />
              </Stack>
            )}
            <Stack horizontal styles={{ root: { width: "90%" } } as IStackStyles} tokens={{ childrenGap: "2em" }} verticalAlign="center">
              <Stack horizontal grow styles={{ root: { width: "100%" } }} tokens={{ childrenGap: "0.5em" }} >
                <Stack.Item grow>
                  <TextField
                    underlined
                    placeholder="Option Title"
                    maxLength={750}
                    readOnly={vm.isReadOnly}
                    errorMessage={lineError?.option?.errorMessage}
                    value={controlledOptionTitle}
                    multiline={true}
                    styles={{ fieldGroup: { minHeight: "32px" }, field: { resize: "none", } }}
                    autoAdjustHeight={true}
                    onBlur={() => {
                      if (controlledOptionTitle === option.title) return;
                      resetOptionTimer()
                      writeOptionTitle();
                    }}
                    onChange={(_e, value) => { setControlledOptionTitle(value || '') }} />
                </Stack.Item>
                <Stack verticalAlign="center" styles={{ root: { width: "2em" } }}>
                  {!vm.isReadOnly && (
                    <div className="showAndHide">
                      <TooltipHost content="Add a photo" calloutProps={{ gapSpace: 0 }} styles={{ root: { display: "inline-block" } }}>
                        <IconButton
                          iconProps={{ iconName: "Photo2", styles: { root: { fontSize: "1em", color: "black" } } }}
                          onClick={(event) => { imageClickHandler(event, index, "option") }} />
                      </TooltipHost>
                    </div>
                  )}
                </Stack>
              </Stack>
              <Stack horizontal grow styles={{ root: { width: "100%" } }} tokens={{ childrenGap: "0.5em" }} >
                <Stack.Item grow>
                  <TextField
                    underlined
                    placeholder="Match Title"
                    maxLength={750}
                    readOnly={vm.isReadOnly}
                    errorMessage={lineError?.promise?.errorMessage}
                    value={controlledPromiseTitle}
                    multiline={true}
                    styles={{ fieldGroup: { minHeight: "32px" }, field: { resize: "none", } }}
                    autoAdjustHeight={true}
                    onBlur={() => {
                      if (controlledPromiseTitle === promise?.title) return;
                      resetPromiseTimer();
                      writePromiseTitle();
                    }}
                    onChange={(_e, value) => {
                      setControlledPromiseTitle(value || '')
                    }} />
                </Stack.Item>
                <Stack verticalAlign="center" styles={{ root: { width: "2em" } }}>
                  {!vm.isReadOnly && (
                    <div className="showAndHide">
                      <TooltipHost content="Add a photo" calloutProps={{ gapSpace: 0 }} styles={{ root: { display: "inline-block" } }}>
                        <IconButton
                          iconProps={{ iconName: "Photo2", styles: { root: { fontSize: "1em", color: "black" } } }}
                          onClick={(event) => { imageClickHandler(event, promiseIndex, "promise") }} />
                      </TooltipHost>
                    </div>
                  )}
                </Stack>
              </Stack>
            </Stack>
          </Stack>
          {option.imageUrl && promise?.imageUrl ? (
            <Stack horizontal styles={{ root: { width: "90%", margin: "0.5rem 0.5rem 0.5rem 3rem !important" } }}>
              <Stack horizontal styles={{ root: { width: "100%" } }} >
                <Image height="100px"
                  src={option.imageUrl}
                  styles={{ root: { boxShadow: "0 0 5px #ccc" } } as IImageStyles}
                />
                {!vm.isReadOnly && (
                  <Stack tokens={{ childrenGap: "0.5em" }} >
                    <IconButton iconProps={{ iconName: "Delete", styles: { root: { fontSize: "1.5em", color: "black" } } }} onClick={() => deleteImage(index, "option")} />
                  </Stack>
                )}
              </Stack>
              <Stack horizontal styles={{ root: { width: "100%" } }} >
                <Image height="100px"
                  src={promise?.imageUrl}
                  styles={{ root: { boxShadow: "0 0 5px #ccc" } } as IImageStyles}
                />
                {!vm.isReadOnly && (
                  <Stack tokens={{ childrenGap: "0.5em" }} >
                    <IconButton iconProps={{ iconName: "Delete", styles: { root: { fontSize: "1.5em", color: "black" } } }} onClick={() => deleteImage(promiseIndex, "promise")} />
                  </Stack>
                )}
              </Stack>
            </Stack>
          ) : option.imageUrl ? (
            <Stack horizontal styles={{ root: { margin: "0.5rem 0.5rem 0.5rem 3rem !important" } }} >
              <Image height="100px"
                src={option.imageUrl}
                styles={{ root: { boxShadow: "0 0 5px #ccc" } } as IImageStyles}
              />
              {!vm.isReadOnly && (
                <Stack tokens={{ childrenGap: "0.5em" }} >
                  <IconButton iconProps={{ iconName: "Delete", styles: { root: { fontSize: "1.5em", color: "black" } } }} onClick={() => deleteImage(index, "option")} />
                </Stack>
              )}
            </Stack>
          ) : promise?.imageUrl && (
            <Stack horizontal styles={{ root: { width: "90%", margin: "0.5rem 0.5rem 0.5rem 3rem !important" } }}>
              <Stack horizontal styles={{ root: { marginLeft: "50% !important" } }} >
                <Image height="100px"
                  src={promise?.imageUrl}
                  styles={{ root: { boxShadow: "0 0 5px #ccc" } } as IImageStyles}
                />
                {!vm.isReadOnly && (
                  <Stack tokens={{ childrenGap: "0.5em" }} >
                    <IconButton iconProps={{ iconName: "Delete", styles: { root: { fontSize: "1.5em", color: "black" } } }} onClick={() => deleteImage(promiseIndex, "promise")} />
                  </Stack>
                )}
              </Stack>
            </Stack>
          )}
        </Stack>
        <Stack.Item styles={{ root: { width: "2em" } }} disableShrink>
          {!vm.isReadOnly &&
            (vm.QuestionMatchingOptions.length > 2 && (
              <IconButton iconProps={{ iconName: "ChromeClose", styles: { root: { color: "black" } } as IIconStyles } as IIconProps} onClick={() => removeOption(index)} />
            ))
          }
        </Stack.Item>
      </Stack>
    </Stack.Item>
  )
}

export default observer(MatchingQuestionOption)
