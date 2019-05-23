import {IInputs, IOutputs} from "./generated/ManifestTypes";
import DataSetInterfaces = ComponentFramework.PropertyHelper.DataSetApi;
import { DropHandler } from "./drophandler/drophandler";
type DataSet = ComponentFramework.PropertyTypes.DataSet;

export class AttachmentsGrid implements ComponentFramework.StandardControl<IInputs, IOutputs> {


	private _apiClient: ComponentFramework.WebApi;

	private _context: ComponentFramework.Context<IInputs>;

	// PCF framework to notify of changes
	private _notifyOutputChanged: () => void;

	// Define Standard container element
	private _container: HTMLDivElement;

	// Define Input Elements
	public _dropElement: HTMLDivElement;

	private _refreshData: EventListenerOrEventListenerObject;

	private _dropHandler: DropHandler;


	/**
	 * Empty constructor.
	 */
	constructor()
	{

	}

	/**
	 * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
	 * Data-set values are not initialized here, use updateView.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
	 * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
	 * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
	 * @param container If a control is marked control-type='starndard', it will receive an empty div element within which it can render its content.
	 */
	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement)
	{

		// Add control initialization code
		this._context = context;
		this._container = document.createElement("div");
		this._notifyOutputChanged = notifyOutputChanged;
		this._apiClient = context.webAPI;
		this._refreshData = this.RefreshData.bind(this);

		// Layout Elements
		this._dropElement = document.createElement("div");
		this._dropElement.classList.add("drop-zone");

		this._dropHandler = new DropHandler(this._apiClient);
		this._dropHandler.HandleDrop(this._dropElement);

		this._container.append(this._dropElement);

		// Bind to parent container
		container.append(this._container);
		
	}

	public RefreshData() {
		this._notifyOutputChanged();
	}

	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
	public updateView(context: ComponentFramework.Context<IInputs>): void
	{
		// Add code to update control view
	}

	/** 
	 * It is called by the framework prior to a control receiving new data. 
	 * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
	 */
	public getOutputs(): IOutputs
	{
		return {};
	}

	/** 
	 * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
	 * i.e. cancelling any pending remote calls, removing listeners, etc.
	 */
	public destroy(): void
	{
		// Add code to cleanup control if necessary
	}

}