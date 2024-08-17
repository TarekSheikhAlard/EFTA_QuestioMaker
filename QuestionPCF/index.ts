import { createElement } from "react";
import { initializeIcons } from "@fluentui/react";
import React from 'react';
import CdsService, { cdsServiceName } from "./cdsService/cdsSerivce";
import ReactDOM from 'react-dom'
import App, { props } from './components/App';
import { IInputs, IOutputs } from "./generated/ManifestTypes";
import QuestionsVM, { serviceProviderName } from "./viewModels/QuestionsVM";
import ServiceProvider from "./ServiceProvider";

initializeIcons();

export class QuestionPCF implements ComponentFramework.ReactControl<IInputs, IOutputs> {
  private vm: QuestionsVM;
  private notifyOutputChanged: () => void;
  private serviceProvider: ServiceProvider;
  context: ComponentFramework.Context<IInputs>;
  container: HTMLDivElement;

  /**
   * Empty constructor.
   */
  constructor() { }

  /**
   * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
   * Data-set values are not initialized here, use updateView.
   * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
   * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
   * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
   */
  public init(
    context: ComponentFramework.Context<IInputs>,
    notifyOutputChanged: () => void,
    _state: ComponentFramework.Dictionary,
    container: HTMLDivElement
  ): void {
    console.info('Version 0.0.32')
    this.context = context;
    this.container = container;
    const cdsService = new CdsService(context);
    this.notifyOutputChanged = notifyOutputChanged;
    this.serviceProvider = new ServiceProvider();
    this.serviceProvider.register<CdsService>(cdsServiceName, cdsService);
    this.serviceProvider.register<ComponentFramework.Context<IInputs>>('context', context);
    this.serviceProvider.register<() => void>('notifyOutputChanged', this.notifyOutputChanged);
    const _context: any = this.context;
    const EntityId = _context.mode.contextInfo.entityId;
    this.vm = new QuestionsVM(this.serviceProvider, EntityId);
    this.serviceProvider.register<QuestionsVM>(serviceProviderName, this.vm);
  }

  /**
   * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
   * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
   * @returns ReactElement root react element for the control
   */
  public updateView(_context: ComponentFramework.Context<IInputs>): React.ReactElement {
    const context: any = this.context;
    const EntityId = context.mode.contextInfo.entityId;
    const isReadOnly = context.mode.isControlDisabled;
    ReactDOM.render(
      React.createElement<props>(App, {
        isReadOnly: isReadOnly,
        serviceProvider: this.serviceProvider,
        entityId: EntityId,
      }),
      this.container
    )
    return createElement(App, {
      serviceProvider: this.serviceProvider,
      isReadOnly: isReadOnly,
    })
  }

  /**
   * It is called by the framework prior to a control receiving new data.
   * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
   */
  public getOutputs(): IOutputs {
    return {
      sampleProperty: this.vm.generateRandomString(),
    };
  }

  /**
   * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
   * i.e. cancelling any pending remote calls, removing listeners, etc.
   */

  public destroy(): void {
    // Add code to cleanup control if necessary
  }
}
